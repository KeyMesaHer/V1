import { z } from 'zod';

export const trainingSchema = z.object({
    // id_usuario: z.number({
    //     required_error: "El ID del usuario es un campo requerido"
    // }).int().positive(),
    area_laboral: z.string({
        required_error: "El área laboral es un campo requerido"
    }).min(3, {
        message: "El área laboral debe tener al menos 3 caracteres"
    }),
    agregar_informacion: z.string({
        required_error: "La información adicional es un campo requerido"
    }).min(5, {
        message: "La información adicional debe tener al menos 5 caracteres"
    }),
});

export const updateTrainingSchema = z.object({
    area_laboral: z.string({
        required_error: "El área laboral es un campo requerido"
    }).min(3, {
        message: "El área laboral debe tener al menos 3 caracteres"
    }).optional(),
    agregar_informacion: z.string({
        required_error: "La información adicional es un campo requerido"
    }).min(5, {
        message: "La información adicional debe tener al menos 5 caracteres"
    }).optional(),
});
