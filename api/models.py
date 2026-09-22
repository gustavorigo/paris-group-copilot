from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


class Projeto(Base):
    """Um produto do studio, do radar ao enquadramento pronto."""

    __tablename__ = "projetos"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nome: Mapped[str] = mapped_column(String(120), nullable=False)
    contexto: Mapped[str] = mapped_column(Text, nullable=False)
    dor_usuario: Mapped[str] = mapped_column(Text, nullable=False)
    criado_em: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    hipoteses: Mapped[list["Hipotese"]] = relationship(back_populates="projeto")


class Hipotese(Base):
    """Hipótese de valor de um projeto, no formato Se / então / porque."""

    __tablename__ = "hipoteses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    projeto_id: Mapped[int] = mapped_column(ForeignKey("projetos.id"), nullable=False)
    se: Mapped[str] = mapped_column(Text, nullable=False)
    entao: Mapped[str] = mapped_column(Text, nullable=False)
    porque: Mapped[str] = mapped_column(Text, nullable=False)
    metrica: Mapped[str] = mapped_column(Text, nullable=False)
    baseline: Mapped[str] = mapped_column(String(120), nullable=False)
    alvo: Mapped[str] = mapped_column(String(120), nullable=False)
    # em_teste | confirmada | inconclusiva | refutada
    estado: Mapped[str] = mapped_column(String(20), default="em_teste", nullable=False)
    criado_em: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    projeto: Mapped["Projeto"] = relationship(back_populates="hipoteses")
