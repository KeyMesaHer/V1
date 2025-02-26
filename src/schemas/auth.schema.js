import { z } from 'zod';

export const registerSchema = z.object({
    nombre: z.string({
        required_error: "El nombre es un campo requerido"
    }),
    cedula: z.string({
        required_error: "La cédula es un campo requerido"
    }).regex(/^\d{7,10}$/, {
        message: 'Formato de cédula inválido. Debe tener entre 7 y 10 dígitos.',
    }),
    email: z.string({
        required_error: "La dirección de correo electrónico es un campo requerido",
    }).email({
        message: 'Dirección de correo electrónico inválida'
    }),
    password: z.string({
        required_error: 'La contraseña es un campo requerido'
    }).min(6, {
       message: 'La contraseña debe tener al menos 6 caracteres.' 
    }),
    cargo: z.string({
        required_error: "El cargo es un campo requerido"
    }),
    rol: z.string({
        required_error: "El rol es un campo requerido"
    }),
});

export const loginSchema = z.object({
    cedula: z.string({
      required_error: "La cédula es un campo requerido",
    }).regex(/^\d{7,10}$/, { 
      message: 'Formato de cédula inválido. Debe tener entre 7 y 10 dígitos.',
    }),
    password: z.string({
      required_error: 'La contraseña es un campo requerido',
    }).min(6, {
      message: 'La contraseña debe tener al menos 6 caracteres.',
    }),
});