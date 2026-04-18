# Guide de prompts efficaces

## Format pour une tâche ciblée
```
Fichier : src/app/xxx/page.tsx (~ligne XX)
Objectif : [une phrase]
Ne pas toucher : [liste]
```

## Format pour une tâche complexe
1. Crée `.claude/plans/nom-tache.md` depuis `_TEMPLATE.md`
2. Remplis-le hors session
3. Dis à Claude : "Exécute `.claude/plans/nom-tache.md`"

## Bonnes pratiques
- Toujours donner le chemin exact du fichier
- Mentionner les numéros de lignes si connus
- Dire explicitement ce qu'il NE faut pas changer
- Utiliser `/compact` quand la session est longue
- Une tâche = un message, pas plusieurs en cascade
