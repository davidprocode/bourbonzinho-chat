export const ontem = new Date();
ontem.setDate(ontem.getDate() - 1);
export const inicioOntem = new Date(
  ontem.getFullYear(),
  ontem.getMonth(),
  ontem.getDate(),
  0,
  0,
  0
);
export const fimOntem = new Date(
  ontem.getFullYear(),
  ontem.getMonth(),
  ontem.getDate(),
  23,
  59,
  59
);
