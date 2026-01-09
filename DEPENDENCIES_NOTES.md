# Notas sobre Dependencias

## Dependencias no utilizadas (pueden eliminarse)

Las siguientes dependencias están instaladas pero NO se usan en el código:

1. **lucide-react** - No se usa ningún icono de esta librería
2. **use-sound** - No se usa para reproducir sonidos
3. **react-intersection-observer** - Solo se usaba en un hook eliminado (`useScrollAnimation.js`)

Para eliminarlas, ejecutar:
```bash
npm uninstall lucide-react use-sound react-intersection-observer
```

Esto reducirá el bundle size aproximadamente en ~500KB.

## Dependencias usadas condicionalmente

- **@react-three/fiber, @react-three/drei, three**: Solo se usan en `Background3DEffects` que ahora está lazy loaded
- **react-hook-form, react-icons**: Solo se usan en `EventForm` que está lazy loaded

Estas dependencias se cargarán solo cuando se necesiten, mejorando el tiempo de carga inicial.
