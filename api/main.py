from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

import models
from database import Base, engine, get_db
from schemas import HipoteseIn, HipoteseOut, ProjetoIn, ProjetoOut


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="Paris Group Copilot API",
    description=(
        "Backend do copiloto de venture studio. Registra projetos e suas "
        "hipóteses de valor para que o aprendizado de um MVP abasteça o próximo."
    ),
    version="0.1.0",
    lifespan=lifespan,
)


@app.get("/projetos", response_model=list[ProjetoOut], tags=["Projeto"])
def listar_projetos(db: Session = Depends(get_db)):
    """Lista os projetos do studio."""
    return db.query(models.Projeto).order_by(models.Projeto.id).all()


@app.post("/projetos", response_model=ProjetoOut, status_code=201, tags=["Projeto"])
def criar_projeto(payload: ProjetoIn, db: Session = Depends(get_db)):
    """Registra um projeto novo com seu contexto e a dor do usuário."""
    projeto = models.Projeto(**payload.model_dump())
    db.add(projeto)
    db.commit()
    db.refresh(projeto)
    return projeto


@app.get("/hipoteses", response_model=list[HipoteseOut], tags=["Hipótese"])
def listar_hipoteses(db: Session = Depends(get_db)):
    """Lista as hipóteses de valor registradas, com seu estado atual."""
    return db.query(models.Hipotese).order_by(models.Hipotese.id).all()


@app.post("/hipoteses", response_model=HipoteseOut, status_code=201, tags=["Hipótese"])
def criar_hipotese(payload: HipoteseIn, db: Session = Depends(get_db)):
    """Registra uma hipótese de valor no formato Se / então / porque."""
    if not db.get(models.Projeto, payload.projeto_id):
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    hipotese = models.Hipotese(**payload.model_dump())
    db.add(hipotese)
    db.commit()
    db.refresh(hipotese)
    return hipotese
