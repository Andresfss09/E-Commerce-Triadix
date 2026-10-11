import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/es';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando el seeding masivo...');

  // Limpiar base de datos
  await prisma.image.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.storeConfig.deleteMany();

  console.log('Base de datos limpiada.');

  // Configuración de la tienda
  await prisma.storeConfig.create({
    data: {
      id: 'global',
      whatsappNumber: '573185753889',
      contactEmail: 'contacto@triadix.com',
      instagramUrl: 'https://instagram.com/triadix',
      announcementBar: '¡Envío gratis por compras superiores a $150.000 COP!',
    },
  });

  // Categorías
  const camisetas = await prisma.category.create({
    data: {
      name: 'Camisetas',
      slug: 'camisetas',
      description: 'Camisetas con estilo oversize y cortes modernos.',
    },
  });

  const pantalones = await prisma.category.create({
    data: {
      name: 'Pantalones',
      slug: 'pantalones',
      description: 'Pantalones cargo, joggers y jeans de alta durabilidad.',
    },
  });

  const chaquetas = await prisma.category.create({
    data: {
      name: 'Chaquetas',
      slug: 'chaquetas',
      description: 'Chaquetas para cualquier clima, con el sello TRIADIX.',
    },
  });

  const productosCamisetas = [
    {
      name: 'Camiseta Oversize Essential',
      description: 'Camiseta 100% algodón de alto gramaje con un corte oversize perfecto para el día a día.',
      basePrice: 65000,
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'
      ],
      slug: 'camiseta-oversize-essential'
    },
    {
      name: 'Camiseta Estampada Vintage',
      description: 'Camiseta con lavado ácido y estampado gráfico retro en la espalda.',
      basePrice: 75000,
      images: [
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&q=80&w=800'
      ],
      slug: 'camiseta-estampada-vintage'
    },
    {
      name: 'Buzo Hoodie Heavyweight',
      description: 'Buzo con capucha súper grueso de 320g, ideal para climas fríos. Corte holgado.',
      basePrice: 110000,
      images: [
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800'
      ],
      slug: 'buzo-hoodie-heavyweight'
    }
  ];

  const productosPantalones = [
    {
      name: 'Pantalón Cargo Tactical',
      description: 'Pantalón cargo utilitario con múltiples bolsillos y ajuste en tobillos.',
      basePrice: 130000,
      images: [
        'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&q=80&w=800'
      ],
      slug: 'pantalon-cargo-tactical'
    },
    {
      name: 'Jogger Techwear',
      description: 'Jogger deportivo con tela repelente al agua y diseño moderno.',
      basePrice: 125000,
      images: [
        'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800'
      ],
      slug: 'jogger-techwear'
    },
    {
      name: 'Jeans Baggy Fit',
      description: 'Jeans de mezclilla pesada con corte ultra holgado estilo los 90s.',
      basePrice: 145000,
      images: [
        'https://images.unsplash.com/photo-1584865288642-42078afe6942?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800'
      ],
      slug: 'jeans-baggy-fit'
    }
  ];

  const productosChaquetas = [
    {
      name: 'Chaqueta Puffer Minimal',
      description: 'Chaqueta acolchada sin logos visibles. Impermeable y térmica.',
      basePrice: 180000,
      images: [
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800'
      ],
      slug: 'chaqueta-puffer-minimal'
    },
    {
      name: 'Chaqueta Denim Clásica',
      description: 'Chaqueta de jean con lavado medio. Un básico indispensable.',
      basePrice: 155000,
      images: [
        'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1520975954732-57dd22299614?auto=format&fit=crop&q=80&w=800'
      ],
      slug: 'chaqueta-denim-clasica'
    },
    {
      name: 'Windbreaker Reflectivo',
      description: 'Rompevientos ligero con detalles reflectivos para la noche.',
      basePrice: 135000,
      images: [
        'https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1544022613-e87ca75a3780?auto=format&fit=crop&q=80&w=800'
      ],
      slug: 'windbreaker-reflectivo'
    }
  ];

  const tallas = ['S', 'M', 'L'];
  const colores = ['Negro', 'Blanco', 'Azul'];

  const generarVariantes = () => {
    return [
      { size: 'M', color: 'Negro', stock: 15, sku: `SKU-${Math.floor(Math.random() * 10000)}` },
      { size: 'L', color: 'Negro', stock: 10, sku: `SKU-${Math.floor(Math.random() * 10000)}` },
      { size: 'M', color: 'Blanco', stock: 5, sku: `SKU-${Math.floor(Math.random() * 10000)}` }
    ];
  };

  const insertProducts = async (productosList: any[], categoryId: string) => {
    for (const prod of productosList) {
      await prisma.product.create({
        data: {
          name: prod.name,
          slug: prod.slug,
          description: prod.description,
          basePrice: prod.basePrice,
          categoryId: categoryId,
          isFeatured: true,
          images: {
            create: [
              { url: prod.images[0], alt: `${prod.name} vista 1`, order: 0 },
              { url: prod.images[1], alt: `${prod.name} vista 2`, order: 1 }
            ]
          },
          variants: {
            create: generarVariantes()
          }
        }
      });
    }
  };

  await insertProducts(productosCamisetas, camisetas.id);
  await insertProducts(productosPantalones, pantalones.id);
  await insertProducts(productosChaquetas, chaquetas.id);

  console.log('Productos creados con éxito.');
  console.log('¡Seeding completado!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
