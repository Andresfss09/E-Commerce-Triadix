export const mockProducts = [
  {
    id: 'prod-1',
    name: 'Camiseta Básica Oversize',
    slug: 'camiseta-basica-oversize',
    basePrice: 65000,
    description: 'Camiseta 100% algodón de alto gramaje con corte oversize. Perfecta para un estilo urbano y relajado.',
    category: 'Camisetas',
    images: [{ url: 'https://placehold.co/600x800/png?text=Oversize', alt: 'Camiseta Negra' }],
    variants: [
      { id: 'v-1', size: 'S', color: 'Negro', stock: 10 },
      { id: 'v-2', size: 'M', color: 'Negro', stock: 5 },
      { id: 'v-3', size: 'L', color: 'Blanco', stock: 0 },
    ],
  },
  {
    id: 'prod-2',
    name: 'Hoodie Essential',
    slug: 'hoodie-essential',
    basePrice: 120000,
    description: 'Buzo con capucha, interior perchado. Comodidad absoluta para días fríos.',
    category: 'Buzos',
    images: [{ url: 'https://placehold.co/600x800/png?text=Hoodie', alt: 'Hoodie Gris' }],
    variants: [
      { id: 'v-4', size: 'M', color: 'Gris', stock: 3 },
      { id: 'v-5', size: 'L', color: 'Gris', stock: 8 },
    ],
  }
];

