## Ejercicio: Introducción a @ngrx/store en Angular

### Objetivo

El objetivo de este ejercicio es familiarizarse con la gestión del estado global en aplicaciones Angular utilizando @ngrx/store. Aprenderás a instalar y configurar @ngrx/store, así como a crear tu primera acción, reductor y selector.

### Instrucciones

1. **Instalación de @ngrx/store**:

   - Utiliza el siguiente comando para instalar @ngrx/store utilizando el schematic:
     ```bash
     ng add @ngrx/store
     ```
   - Este comando actualizará automáticamente tu `package.json` para incluir `@ngrx/store` en las dependencias, ejecutará `npm install` para instalar las dependencias y actualizará el archivo `src/app/app.module.ts` para incluir `StoreModule.forRoot({})` en el array de imports.

2. **Configuración del Store**:

   - Abre el archivo `src/app/app.module.ts` y verifica que el módulo de Store se haya agregado correctamente. Deberías ver algo como esto en el array de imports:
     ```typescript
     imports: [
       StoreModule.forRoot({})
     ],
     ```

3. **Creación de tu primera acción**:

   - Crea un nuevo archivo llamado `actions.ts` en una carpeta llamada `state` dentro de `src/app/`.
   - Define tu primera acción. Por ejemplo:

     ```typescript
     import { createAction } from "@ngrx/store";

     export const addItem = createAction("[Item] Add Item");
     ```

4. **Creación de tu primer reductor**:

   - Crea un nuevo archivo llamado `reducer.ts` en la misma carpeta `state`.
   - Define tu primer reductor. Por ejemplo:

     ```typescript
     import { createReducer, on } from "@ngrx/store";
     import { addItem } from "./actions";

     export const initialState = [];

     const _itemReducer = createReducer(
       initialState,
       on(addItem, (state, action) => [...state, action])
     );

     export function itemReducer(state, action) {
       return _itemReducer(state, action);
     }
     ```

5. **Creación de tu primer selector**:

   - Crea un nuevo archivo llamado `selectors.ts` en la misma carpeta `state`.
   - Define tu primer selector. Por ejemplo:

     ```typescript
     import { createSelector } from "@ngrx/store";

     export const selectItems = (state) => state.items;

     export const selectItemCount = createSelector(selectItems, (items) => items.length);
     ```

### Resultado Esperado

Al finalizar el ejercicio, deberías tener configurado @ngrx/store en tu aplicación, junto con tu primera acción, reductor y selector. Asegúrate de probar la funcionalidad de tu store para verificar que los cambios se han implementado correctamente.

### Recursos Adicionales

- [Documentación de @ngrx/store](https://ngrx.io/guide/store)
- [Ejemplos de uso de @ngrx/store](https://ngrx.io/guide/store#usage)

---

¡Buena suerte con el ejercicio!
