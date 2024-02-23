# Challenge Simon

Un collègue, sympa mais pas très organisé, m'a envoyé un début de code pour jouer au fameux jeu "Simon". 

Pour ceux qui ne connaissent pas, Simon est un jeu de memory électronique, composé de 4 cases colorées (rouge, bleu, vert, jaune). Le jeu se décompose en 2 phases: 
- "Simon says" : 3 cases s'allument, dans un ordre aléatoire.
- "Player repeat": le joueur (donc nous!) doit reproduire la séquence de Simon.

Si la réponse est juste, Simon ajoute une nouvelle couleur à la fin de la séquence, et recommence.

Si le joueur se trompe ou ne répond rien pendant 5 secondes, la partie s'arrête.

## Étape 1 : Analyse du code fourni

D'après mon collègue, toute la partie "Simon says" est finie. Sauf que, quand j'ouvre le fichier html dans mon navigateur, rien ne s'affiche... 

Commence par parcourir le code fourni pour comprendre ce qu'a fait mon collègue, et où est l'erreur !?

## Étape 2 : Zone de messages

J'ai commencé à coder une méthode pour afficher un message, dans une zone prévue pour. Mais j'aimerai que lorsqu'on affiche un message, ça cache le bouton "Démarrer". Tu peux t'en charger ?

Il faudrait aussi prévoir une méthode pour faire l'inverse : cacher la zone de message et ré-afficher le bouton à la place.


## Étape 3 : Commencer par la fin

Ensuite il va nous falloir une méthode pour gérer les fins de parties. Il faut que cette méthode : 
- affiche une alerte avec un message du type "Partie terminée. Votre score : 12". Le nombre à afficher est la taille de la séquence de Simon.
- cache la zone de message.
- ré-affiche le bouton "Démarrer".
- puis vide la séquence.

## Étape 4 : Interactions utilisateur

Attachons nous à la partie "Player repeat". Voici ce qu'il faut mettre en place : 
- Il faut un compteur, ou plutôt une variable `indice`, pour se souvenir de la position du joueur dans la séquence de Simon.
- Lorsque l'utilisateur clique sur une case, il faut lancer une nouvelle méthode.
- Cette méthode applique l'effet visuel "bump" à la cellule cliquée...
- ...et vérifie que la case cliquée correspond à la couleur attendue, puis :
  - Si ce n'est pas la bonne réponse, appelle la méthode de fin de partie.
  - Si c'est la bonne réponse et que la séquence n'est pas finie, incrémente `indice`.
  - Si c'est la bonne réponse et que la séquence est finie, appelle la méthode `nextMove` (codée à l'étape suivante).

## Étape 5 : Séquence finie, Simon parle à nouveau

OK, le joueur a reproduit la séquence de Simon. Simon va donc recommencer la séquence, en ajoutant une nouvelle couleur à la fin.

Pour faire ça, on a besoin d'une méthode (`nextMove`), qui va tirer une couleur au hasard, ajouter la nouvelle couleur à la séquence, et rappeller la méthode pour faire parler Simon.

## Étape 6 : Dire au joueur ce qu'il doit faire

Utilise les méthode qui gèrent la zone de message pour :
- quand Simon parle, afficher "Mémorisez la séquence"
- quand c'est au joueur de jouer, afficher "Reproduisez la séquence"

## Étape 7 : Ajouter la limite de temps

Il nous reste une règle à implémenter : si le joueur ne répond rien pendant 5 secondes, la partie est finie.

Je sais pas trop comment tu veux t'y prendre, et il y a probablement plusieurs moyens de faire ça, mais voilà comment je ferai :
- Quand Simon a fini de parler, on lance un setTimeout, qui va lancer la méthode de fin de partie au bout de 5 secondes.
- A chaque fois que le joueur clique sur une case, on supprime le timeout et, si la séquence n'est pas finie, on relance le même. La fonction `clearTimeout` doit pouvoir t'aider, mais je me souviens plus comment on s'en sert.


## Étape Bonus (<strong>FACULTATIF</strong>)
<details>
<summary>C'est vraiment un bonus. A tenter uniquement si tu as réussi tout le reste.</summary>

Trop bien, on a un Simon fonctionnel. Enfin... presque fonctionnel. Parceque là, un petit malin peut cliquer sur les cases pendant que Simon parle, sans attendre la fin de la séquence... C'est un peu de la triche.

Il faudrait donc que le joueur ne puisse pas cliquer pendant que Simon parle. Tu penses pouvoir faire ça ??

</details>