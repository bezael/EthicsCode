## Ejercicio: Conversión de @Input y @Output a Signals en Angular

### Objetivo

El objetivo de este ejercicio es familiarizarse con la nueva forma de manejar la comunicación entre componentes en Angular utilizando **signals** en lugar de los tradicionales **@Input** y **@Output**.

### Instrucciones

1. **Contexto**: Tienes un componente de tarjeta de producto (`ProductCardComponent`) que actualmente utiliza `@Input` para recibir datos del producto y `@Output` para emitir eventos cuando se agrega un producto al carrito.

2. **Tarea**: Debes modificar el componente para que utilice **signals** en lugar de `@Input` y `@Output`.

3. **Pasos a seguir**:
   - Reemplaza la propiedad `@Input` que recibe el producto por un **signal** que se suscriba a los cambios.
   - Cambia el `@Output` que emite el evento de agregar al carrito por un **signal** que notifique cuando se agrega un producto.
   - Asegúrate de que el componente siga funcionando correctamente después de realizar estos cambios.

### Ejemplo de Código

A continuación, se muestra un fragmento del código original que debes modificar:

```typescript
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Product } from "../models/product.model";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrl: "./product-card.component.scss",
})
export class ProductCardComponent {
  @Input({ required: true, alias: "product" }) currentProduct!: Product;
  @Output() addToCartEvent = new EventEmitter<Product>();

  onAddToCart(): void {
    this.addToCartEvent.emit(this.currentProduct);
  }
}
```

### Resultado Esperado

Al finalizar el ejercicio, tu componente debería utilizar **signals** para manejar la entrada y salida de datos, manteniendo la funcionalidad original. Asegúrate de probar el componente para verificar que los cambios se han implementado correctamente.

### Recursos Adicionales

- [Documentación de Angular sobre Signals](https://angular.io/guide/signals)
- [Ejemplos de uso de Signals en Angular](https://angular.io/guide/signals#examples)

---

¡Buena suerte con el ejercicio!
