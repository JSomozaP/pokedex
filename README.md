# Pokédex Interactive

Un Pokédex interactif moderne permettant d'explorer les 151 premiers Pokémon avec leurs évolutions complètes. Développé avec HTML, CSS et JavaScript vanilla, utilisant l'API Pokebuild pour les données.

## 🌟 Fonctionnalités

- **Navigation intuitive** : Menu déroulant personnalisé avec recherche en temps réel
- **Affichage détaillé** : Images HD, types avec icônes, et informations complètes
- **Système d'évolution complet** : 
  - Affichage des pré-évolutions (même hors 1ère génération)
  - Affichage des évolutions (incluant toutes les générations)
  - Navigation cliquable entre les évolutions
- **Interface responsive** : Optimisée pour desktop, tablette et mobile
- **Design rétro-gaming** : Police pixel-art et dégradé rouge emblématique

## 📸 Aperçu

### Interface principale
![Interface principale](screenshots/pokedex%20interface.png)

### Recherche de Pokémon
![Recherche](screenshots/pokedex%20test%20recherche.png)

### Fiche Pokémon avec types et évolution
![Fiche avec évolution](screenshots/pokedex%20fiche%20perso%20avec%20type%20et%20evolution.png)

### Fiche avec évolutions multiples
![Évolutions multiples](screenshots/pokedex%20fiche%20perso%20avec%20type%20evolution%20et%20sous%20evolution.png)

### Toutes les évolutions d'Évoli
![Évolutions d'Évoli](screenshots/pokedex%20inclusion%20de%20toute%20les%20evolutions%20evoli.png)

### Version responsive
![Responsive](screenshots/pokedex%20responsive.png)

### Responsive - Évolutions d'Évoli
![Responsive Évoli](screenshots/pokedex%20responsive%20evoli.png)

### Wireframe de l'interface
![Wireframe](screenshots/pokedex%20wireframe%20interface.png)

## 🚀 Installation et utilisation

### Prérequis
- Un navigateur web moderne
- Connexion internet (pour les appels API)

### Installation
1. Clonez ou téléchargez ce repository
```bash
git clone [url-du-repo]
cd pokedex
```

2. Ouvrez `index.html` dans votre navigateur
```bash
# Ou utilisez un serveur local
python -m http.server 8000
# Puis ouvrez http://localhost:8000
```

### Utilisation
1. **Sélectionner un Pokémon** : Cliquez sur le bouton de sélection ou utilisez la barre de recherche
2. **Explorer les évolutions** : Cliquez sur les cartes d'évolution pour naviguer entre les Pokémon
3. **Rechercher** : Tapez le nom d'un Pokémon dans la barre de recherche pour un accès rapide

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : 
  - Grid et Flexbox pour la mise en page
  - Media queries pour le responsive
  - Animations et transitions
- **JavaScript ES6+** :
  - Async/await pour les appels API
  - DOM manipulation
  - Event handling
- **APIs** :
  - [Pokebuild API](https://pokebuildapi.fr/) : Données principales et images HD
  - [PokeAPI](https://pokeapi.co/) : Sprites de fallback

## 📱 Responsive Design

Le Pokédex s'adapte automatiquement à différentes tailles d'écran :

- **Desktop** (> 768px) : Affichage côte à côte avec liste fixe
- **Tablette** (768px - 480px) : Disposition en colonne avec éléments ajustés
- **Mobile** (< 480px) : Interface optimisée pour petit écran

## 🎨 Fonctionnalités techniques

### Gestion des évolutions
- Support des pré-évolutions hors 1ère génération (ex: Pichu → Pikachu)
- Affichage des évolutions toutes générations confondues (ex: toutes les évolutions d'Évoli)
- Images HD pour toutes les évolutions et pré-évolutions

### Performance
- Chargement asynchrone des données
- Cache des icônes de types
- Optimisation des requêtes API

### Accessibilité
- Alt text pour toutes les images
- Navigation clavier possible
- Contraste optimisé

## 📂 Structure du projet

```
pokedex/
├── index.html          # Page principale
├── style.css           # Styles et responsive
├── main.js             # Logique JavaScript
├── screenshots/        # Captures d'écran
├── README.md           # Documentation
└── LICENSE            # Licence MIT
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit vos changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push sur la branche (`git push origin feature/nouvelle-fonctionnalité`)
5. Ouvrir une Pull Request

## 📋 Améliorations futures

- [ ] Ajout d'informations supplémentaires (stats, taille, poids)
- [ ] Système de favoris
- [ ] Mode sombre/clair
- [ ] Support de toutes les générations
- [ ] Ajout des cris de Pokémon
- [ ] Comparateur de Pokémon

## 🐛 Bugs connus

Aucun bug majeur connu actuellement. Si vous en trouvez un, merci d'ouvrir une issue.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [Pokebuild API](https://pokebuildapi.fr/) pour les données et images HD
- [PokeAPI](https://pokeapi.co/) pour les sprites de fallback
- [Google Fonts](https://fonts.google.com/) pour la police Press Start 2P
- La communauté Pokémon pour l'inspiration

---

Développé avec ❤️ pour les fans de Pokémon
