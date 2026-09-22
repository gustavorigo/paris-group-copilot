from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

Estado = Literal["em_teste", "confirmada", "inconclusiva", "refutada"]


class ProjetoIn(BaseModel):
    nome: str = Field(max_length=120, examples=["Paris Group Copilot"])
    contexto: str = Field(examples=["Um cliente procurou o studio com um pedido específico."])
    dor_usuario: str = Field(
        examples=["Marina leva 20 dias entre a ideia e o enquadramento pronto."]
    )


class ProjetoOut(ProjetoIn):
    model_config = ConfigDict(from_attributes=True)

    id: int
    criado_em: datetime


class HipoteseIn(BaseModel):
    projeto_id: int
    se: str = Field(examples=["o Copilot sugerir enquadramentos baseados em MVPs anteriores"])
    entao: str = Field(examples=["Marina reduz o tempo entre a ideia e o enquadramento pronto"])
    porque: str = Field(
        examples=["ela deixa de partir do zero e passa a revisar em vez de criar"]
    )
    metrica: str = Field(examples=["dias entre a entrada da ideia e o enquadramento pronto"])
    baseline: str = Field(max_length=120, examples=["20 dias"])
    alvo: str = Field(max_length=120, examples=["10 dias"])
    estado: Estado = "em_teste"


class HipoteseOut(HipoteseIn):
    model_config = ConfigDict(from_attributes=True)

    id: int
    criado_em: datetime
