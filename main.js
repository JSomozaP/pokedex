const pokemonSelect = document.getElementById('pokemon-select');
const pokemonDisplay = document.querySelector('.pokemon-display');
const searchInput = document.getElementById('search-input');
const pokemonListCustom = document.querySelector('.pokemon-list-custom');
let typeIcons = {};

// Créer le bouton de sélection
const selectButton = document.createElement('button');
selectButton.className = 'pokemon-select-button';
selectButton.textContent = 'Sélectionnez un Pokemon';
pokemonListCustom.parentNode.insertBefore(selectButton, pokemonListCustom);

// Charger les icônes des types
async function loadTypeIcons() {
    try {
        const response = await fetch('https://pokebuildapi.fr/api/v1/types');
        const types = await response.json();
        types.forEach(type => {
            typeIcons[type.name.toLowerCase()] = type.image;
        });
    } catch (error) {
        console.error('Erreur lors du chargement des icônes:', error);
    }
}

// Charger les 151 premiers Pokémon
async function loadPokemons() {
    try {
        const pokebuildResponse = await fetch('https://pokebuildapi.fr/api/v1/pokemon');
        const pokebuildData = await pokebuildResponse.json();
        const firstGenPokemon = pokebuildData.filter(p => p.id <= 151);
        
        pokemonListCustom.innerHTML = '';
        
        firstGenPokemon.forEach((pokemon) => {
            const pokemonOption = document.createElement('div');
            pokemonOption.className = 'pokemon-option';
            
            const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
            
            pokemonOption.innerHTML = `
                <span class="number">${pokemon.id}</span>
                <img src="${spriteUrl}" alt="${pokemon.name}">
                <span>${pokemon.name}</span>
            `;
            
            pokemonOption.addEventListener('click', (e) => {
                e.stopPropagation();
                displayPokemonDetails(pokemon.id, pokemon.name);
                pokemonListCustom.classList.remove('active');
                selectButton.textContent = pokemon.name;
            });
            
            pokemonListCustom.appendChild(pokemonOption);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des Pokémon:', error);
    }
}

// Afficher les détails d'un Pokémon
async function displayPokemonDetails(id, name) {
    try {
        console.log(`Loading details for Pokemon #${id} (${name})`);

        // Charger les données du Pokémon actuel
        const pokebuildResponse = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${id}`);
        if (!pokebuildResponse.ok) {
            throw new Error(`HTTP error! status: ${pokebuildResponse.status}`);
        }
        const pokebuildData = await pokebuildResponse.json();
        
        // Si le Pokémon a une pré-évolution hors 1ère gen, charger ses données
        if (pokebuildData.apiPreEvolution && pokebuildData.apiPreEvolution.name) {
            const preEvoId = pokebuildData.apiPreEvolution.pokedexIdd;
            // Charger les détails de la pré-évolution même si elle est hors 1ère gen
            const preEvoResponse = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${preEvoId}`);
            if (preEvoResponse.ok) {
                const preEvoData = await preEvoResponse.json();
                // Mettre à jour les données de pré-évolution
                pokebuildData.apiPreEvolution = {
                    ...pokebuildData.apiPreEvolution,
                    image: preEvoData.image,
                    pokedexIdd: preEvoData.id
                };
            }
        }
        
        let html = `
            <div class="number">n°${pokebuildData.id}</div>
            <img src="${pokebuildData.image}" alt="${pokebuildData.name}">
            <h2>${pokebuildData.name.toUpperCase()}</h2>
            <div class="types">
                ${pokebuildData.apiTypes.map(type => `
                    <span class="type">
                        <img src="${type.image}" class="type-icon" alt="${type.name}">
                        ${type.name}
                    </span>
                `).join('')}
            </div>
        `;

        html += '<div class="evolution-section">';
        
        // Vérifier et afficher la pré-évolution si elle existe
        if (pokebuildData.apiPreEvolution && pokebuildData.apiPreEvolution.name) {
            const preEvoId = pokebuildData.apiPreEvolution.pokedexIdd;
            html += `
                <h3>Évolue de :</h3>
                <div class="evolution-grid">
                    <div class="evolution-card" onclick="displayPokemonDetails(${preEvoId}, '${pokebuildData.apiPreEvolution.name}')">
                        <span class="number">#${preEvoId}</span>
                        <img src="${pokebuildData.apiPreEvolution.image || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${preEvoId}.png`}" alt="${pokebuildData.apiPreEvolution.name}">
                        <span class="name">${pokebuildData.apiPreEvolution.name}</span>
                    </div>
                </div>
            `;
        }
        
// Vérifier et afficher les évolutions si elles existent
if (pokebuildData.apiEvolutions && pokebuildData.apiEvolutions.length > 0) {
    // Charger les données des évolutions pour obtenir les images HD
    const evolutionsPromises = pokebuildData.apiEvolutions.map(async evolution => {
        const response = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${evolution.pokedexId}`);
        const data = await response.json();
        return {
            ...evolution,
            image: data.image
        };
    });

    // Attendre que toutes les évolutions soient chargées
    const evolutionsWithImages = await Promise.all(evolutionsPromises);

    html += `
        <h3>Évolue en :</h3>
        <div class="evolution-grid">
            ${evolutionsWithImages.map(evolution => `
                <div class="evolution-card" onclick="displayPokemonDetails(${evolution.pokedexId}, '${evolution.name}')">
                    <span class="number">#${evolution.pokedexId}</span>
                    <img src="${evolution.image}" alt="${evolution.name}">
                    <span class="name">${evolution.name}</span>
                </div>
            `).join('')}
        </div>
    `;
}

        html += '</div>';
        pokemonDisplay.innerHTML = html;

    } catch (error) {
        console.error('Erreur détaillée:', error);
        pokemonDisplay.innerHTML = `<p>Erreur lors du chargement de ${name}</p>`;
    }
}

// Événements du menu déroulant
selectButton.addEventListener('click', (e) => {
    e.stopPropagation();
    pokemonListCustom.classList.toggle('active');
});

// Fermer le menu si on clique en dehors
document.addEventListener('click', (e) => {
    if (!pokemonListCustom.contains(e.target) && !selectButton.contains(e.target)) {
        pokemonListCustom.classList.remove('active');
    }
});

// Événement de recherche
searchInput.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    const pokemonOptions = document.querySelectorAll('.pokemon-option');
    
    pokemonOptions.forEach(option => {
        const pokemonName = option.querySelector('span:last-child').textContent.toLowerCase();
        option.style.display = pokemonName.includes(searchText) ? '' : 'none';
    });
    
    if (searchText) {
        pokemonListCustom.classList.add('active');
    }
});

// Initialisation
async function initialize() {
    await loadTypeIcons();
    await loadPokemons();
}

// Démarrer l'application
initialize();