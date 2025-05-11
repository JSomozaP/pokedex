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
        // Charger les données depuis Pokebuild pour avoir les noms en français
        const pokebuildResponse = await fetch('https://pokebuildapi.fr/api/v1/pokemon');
        const pokebuildData = await pokebuildResponse.json();
        const firstGenPokemon = pokebuildData.filter(p => p.id <= 151);
        
        // Vider la liste personnalisée
        pokemonListCustom.innerHTML = '';
        
        // Créer les options avec les noms en français
        firstGenPokemon.forEach((pokemon) => {
            const pokemonOption = document.createElement('div');
            pokemonOption.className = 'pokemon-option';
            
            // Récupérer le sprite depuis PokeAPI directement
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

        const pokebuildResponse = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${id}`);
        if (!pokebuildResponse.ok) {
            throw new Error(`HTTP error! status: ${pokebuildResponse.status}`);
        }
        const pokebuildData = await pokebuildResponse.json();
        
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
    console.log('Pre-evolution data:', pokebuildData.apiPreEvolution);
    
    const preEvoId = pokebuildData.apiPreEvolution.pokedexIdd; // Notez le double 'd'
    html += `
        <h3>Évolue de :</h3>
        <div class="evolution-grid">
            <div class="evolution-card">
                <span class="number">#${preEvoId}</span>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${preEvoId}.png" alt="${pokebuildData.apiPreEvolution.name}">
                <span class="name">${pokebuildData.apiPreEvolution.name}</span>
            </div>
        </div>
    `;
}
        
        // Vérifier et afficher les évolutions si elles existent
        if (pokebuildData.apiEvolutions && pokebuildData.apiEvolutions.length > 0) {
            html += `
                <h3>Évolue en :</h3>
                <div class="evolution-grid">
                    ${pokebuildData.apiEvolutions.map(evolution => `
                        <div class="evolution-card">
                            <span class="number">#${evolution.pokedexId}</span>
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.pokedexId}.png" alt="${evolution.name}">
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