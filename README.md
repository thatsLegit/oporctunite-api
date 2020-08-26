Installation 

Requis : Node, yarn, npm

Préalable

MacOS

Installer yarn avec Brew package manager :
brew yarn install

Ou télécharger directement via le terminal :
curl -o- -L https://yarnpkg.com/install.sh | bash

Ou npm install yarn

Windows

Avec Chocolatey :

choco install yarn


Une fois le projet cloné et Node, yarn, npm installé, aller dans le dossier du projet.

2 scripts sont définis dans package.json :

Pour lancer le serveur en mode développement (permettant le fast-refresh après un ctrl+s notamment...) :
npm run dev

Pour lancer le serveur en mode production, 
npm start

Au lancement, le serveur tente de se connecter à la bd mysql dont les username:login doient être spécifiés dans config.js




