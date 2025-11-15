import {z} from 'zod'

//? Se aran validaciones con zod ya que react hook form solo permite validaciones desde el lado del cliente
export const OrderSchema = z.object({
  // name: z.string().min(1, {message: 'El nombre es requerido'}),
  name: z.string().min(1, 'El nombre es requerido'),
  total: z.number().min(1, 'Se requiere al menos un producto'),
  // No puedo importar un type dentro de un schema
  order: z.array(
    z.object({
      id: z.number(),
      quantity: z.number().min(1, 'Se requiere al menos un producto'),
      subTotal: z.number().min(1, 'Se requiere al menos un producto'),
    })
  ),
  
})

export const OrderIdSchema =z.object({
  orderId: z.string()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, { message: 'El id es requerido' }),
})

export const SearchSchema = z.object({
  search: z.string()
    .trim() // Elimina los espacios al inicio y al final
    .min(1, {message: 'La búsqueda no puede ir vacía '}),
})

export const ProductSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'El Nombre del Producto no puede ir vació'}),
    price: z.string()
        .trim()
        .transform((value) => parseFloat(value)) 
        .refine((value) => value > 0, { message: 'Precio no válido' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value)) 
        .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    image: z.string().trim().min(1, {message: 'La Imagen es Obligatoria' })
})