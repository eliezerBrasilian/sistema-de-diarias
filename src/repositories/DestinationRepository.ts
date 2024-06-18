import { Destino } from "../types/Destino";

export class DestinationRepository {
  getAll(): Destino[] {
    return destinos();
  }
}

function destinos(): Destino[] {
  const list: Destino[] = [
    { cidade: "UBÁ", nome: "Hospital Santa Isabel - Ubá", uf: "Minas Gerais" },
    { cidade: "UBÁ", nome: "UltraImagem - Ubá", uf: "Minas Gerais" },
    { cidade: "UBÁ", nome: "Hospital São Januário - Ubá", uf: "Minas Gerais" },
    {
      cidade: "Juiz de Fora",
      nome: "Hospital maternidade - JF",
      uf: "Minas Gerais",
    },
    {
      cidade: "Juiz de Fora",
      nome: "Terezinha de Jesus - JF",
      uf: "Minas Gerais",
    },
    {
      cidade: "Muriaé",
      nome: "Fundação Cristiano Varela - MU",
      uf: "Minas Gerais",
    },
  ];

  return list;
}
