API utilisant les technologies Node, Express, Sequelize (ORM pour Mysql notamment).

*https://expressjs.com/en/api.html* <br>
*https://sequelize.org/v5/*

# Restant à faire
setup SSL

# Pré-requis

## MacOS

Installer yarn avec Brew package manager :

```
brew install yarn
```

Ou télécharger directement via le terminal :

```
curl -o- -L https://yarnpkg.com/install.sh | bash
```

## Windows

Avec Chocolatey :

```
choco install yarn
```

Notez que l'utilisation de yarn est un choix, mais il est possible de switcher vers npm.


## Mysql

Le serveur tente de se connecter à une bd mysql au lancement, donc assurez-vous d'avoir un serveur Mysql en route
avant le lancement. 
La bd n'est pas généré automatiquement au lancement. 
Pour développer en local, il est conseillé d'importer le script de la bd directement depuis la bd Mysql de l'ENVT avec PhpMyAdmin.


## Installation des dépendances

```
yarn install
```

## Lancer le serveur

2 scripts différents, définis dans package.json. 
Le mode dev est conseillé en developpement, permet notamment le fast refresh avec nodemon

```
# development mode
yarn run dev

# production mode
yarn start
```


# API documentation
https://oporctunite.envt.fr/oporctunite-api






