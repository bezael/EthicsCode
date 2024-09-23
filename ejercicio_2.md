## Ejercicio: Conversión de *ngIf y *ngFor a @if y @for en Angular

### Objetivo

El objetivo de este ejercicio es familiarizarse con la nueva sintaxis de Angular para manejar estructuras de control en las plantillas, específicamente la conversión de `*ngIf` y `*ngFor` a `@if` y `@for`.

### Instrucciones

1. **Contexto**: Tienes un componente que utiliza `*ngIf` para mostrar un elemento condicionalmente y `*ngFor` para iterar sobre una lista de elementos.

2. **Tarea**: Debes modificar el componente para que utilice `@if` y `@for` en lugar de `*ngIf` y `*ngFor`.

3. **Pasos a seguir**:
   - Identifica las secciones del código donde se utilizan `*ngIf` y `*ngFor`.
   - Reemplaza `*ngIf` con `@if` y ajusta la lógica según sea necesario.
   - Reemplaza `*ngFor` con `@for` y asegúrate de que la iteración funcione correctamente.
   - Verifica que el componente siga funcionando como se espera después de realizar estos cambios.

### Ejemplo de Código

A continuación, se muestra un fragmento del código original que debes modificar:

```html
<div class="products-container">
  <div class="product-grid">
    <ng-container *ngFor="let product of products$ | async as products; trackBy:trackFn">
      <app-product-card data-testid="product-card" (addToCartEvent)="addToCart($event)" class="product-card" [product]="product"></app-product-card>
    </ng-container>
  </div>
</div>
```

### Resultado Esperado

Al finalizar el ejercicio, tu componente debería utilizar `@if` y `@for` para manejar la lógica de visualización y iteración, manteniendo la funcionalidad original. Asegúrate de probar el componente para verificar que los cambios se han implementado correctamente.

### Recursos Adicionales

- [Documentación de Angular sobre la nueva sintaxis](https://angular.io/guide/syntax)

---

¡Buena suerte con el ejercicio!
