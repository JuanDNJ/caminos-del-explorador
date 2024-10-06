import { describe, expect, it } from "vitest"

// Objetivo: Imagina que eres un explorador que viaja por una cuadrícula. 
// Tu objetivo es trazar el camino correcto siguiendo ciertas reglas específicas. 
// El propósito de esta kata es evaluar la lógica condicional y el control de flujo
// del programador.

// Dado un array de movimientos (N, S, E, O para Norte, Sur, Este, Oeste), se debe determinar si el explorador termina en el mismo punto en que empezó.
// Si el explorador termina en el mismo punto, devolver "Exploración Completa".
// Si el explorador termina en una posición diferente, devolver "Perdido en la Aventura".
// Si los movimientos superan los 10 pasos, sin importar la posición final, devolver "Demasiado lejos".
// Reglas para el movimiento:

// Partes desde el punto (0, 0).
// N incrementa la coordenada y en 1.
// S decrementa la coordenada y en 1.
// E incrementa la coordenada x en 1.
// O decrementa la coordenada x en 1.
// Requisitos adicionales:

// Crea una función llamada caminosDelExplorador(movimientos) que reciba un array de caracteres (movimientos).
// Devuelve la descripción correspondiente según las reglas mencionadas.

export const caminosDelExplorador = (movimientos: string[]) => {

    enum Movimientos {
        N = "N",
        S = "S",
        E = "E",
        O = "O"
    }

    const maximoDePasos = 10;
    const coordenadas = { x: 0, y: 0 };

    // Verificar si movimientos es un array
    if (Array.isArray(movimientos)) {

        // Si los movimientos superan los 10 pasos, sin importar la posición final, devolver "Demasiado lejos
        if (movimientos.length > maximoDePasos) {
            return "Demasiado lejos";
        }

        // Reglas para el movimiento:
        // @Record<Keys, Type>, Construye un tipo de objeto cuyas claves de propiedad son Keys
        // y cuyos valores de propiedad son Type. 
        // Esta utilidad se puede utilizar para asignar las propiedades de un tipo a otro tipo.
        const reglas: Record<Movimientos, { x: number, y: number }> = {
            [Movimientos.N]: { x: 0, y: 1 },   // Norte incrementa y
            [Movimientos.S]: { x: 0, y: -1 },  // Sur decrementa y
            [Movimientos.E]: { x: 1, y: 0 },   // Este incrementa x
            [Movimientos.O]: { x: -1, y: 0 }   // Oeste decrementa x
        };

        // Procesamos cada movimiento y actualizamos las coordenadas
        movimientos.forEach((paso) => {
            const movimiento = reglas[paso as Movimientos];
            if (movimiento) {
                coordenadas.x += movimiento.x;
                coordenadas.y += movimiento.y;
            }
        });



        if (coordenadas.x === 0 && coordenadas.y === 0) {  // Si el explorador termina en el mismo punto, devolver "Exploración Completa
            return "Exploración Completa";
        } else { // Si el explorador termina en una posición diferente, devolver "Perdido en la Aventura
            return "Perdido en la aventura";
        }

    } else {
        return false;
    }
};

// const caminoSeguro = caminosDelExplorador(['N', 'S', 'E', 'O'])
// const caminoUno = caminosDelExplorador(['N', 'N', 'N', 'S', "E", 'S', 'S', "O"])
// const caminoDos = caminosDelExplorador(['N', 'N', 'N', 'S', "E", 'S', 'S', "O", "N"])
// const caminoTres = caminosDelExplorador(['N', 'N', 'N', 'S', "E", 'S', 'S', "O"])
// const caminoCuatro = caminosDelExplorador(['N', 'N', 'N', 'S', "E", 'S', 'S', "O", 'S', 'S', "O"])
// console.table({ caminoSeguro, caminoUno, caminoDos, caminoTres, caminoCuatro })

describe('caminosDelExplorador', () => {

    it('Comprobar que esta definida la funcion caminosDelExplorador', () => {
        expect(caminosDelExplorador).toBeDefined()
    })

    it('Se espera que reciba como parametro un array', () => {
        const movimientos: string[] = ['Norte', 'Sur', 'Este', 'Oeste']
        expect(caminosDelExplorador(movimientos)).toBeTruthy()
    })
    it('Si el explorador termina en el mismo punto, devolver "Exploración Completa', () => {
        const movimientos: string[] = ['N', 'N', 'N', 'S', "E", 'S', 'S', "O"]
        expect(caminosDelExplorador(movimientos)).toBe('Exploración Completa')
    })
    it('Si el explorador termina en una posición diferente, devolver "Perdido en la Aventura', () => {
        const movimientos: string[] = ['N', 'N', 'N', 'S', "E", 'S', 'S', "O", "N"]
        expect(caminosDelExplorador(movimientos)).toBe('Perdido en la aventura')
    })

    it('Si los movimientos superan los 10 pasos, sin importar la posición final, devolver "Demasiado lejos', () => {
        const movimientos: string[] = ['N', 'N', 'N', 'S', "E", 'S', 'S', "O", "N", "N", "O"]
        expect(caminosDelExplorador(movimientos)).toBe('Demasiado lejos')
    })

})