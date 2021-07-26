<h1 align="center">Groupomania - Projet 7</h1>
<P align="center"><img src="https://user.oc-static.com/upload/2019/09/04/15676009353158_image2.png"  width="400px"/></p>
<p align="center">Créer un Réseau Social d'Entreprise</p></br>

<details open="open">
  <summary>Sommaire</summary>
  <ol>
    <li>
      <a href="#apropos">À propos du Site</a>
      <ul>
        <li><a href="#outils">Outils utilisés</a></li>
        <li><a href="#doc">Documentation</a></li>
      </ul>
    </li>
    <li>
      <a href="#demarrage">Démarrage</a>
      <ul>
        <li><a href="#prerequis">Prérequis</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#lancement">Lancement de l'Application</li>
      </ul>
    </li>
    <li><a href="#dependence">Dépendences NPM</li> 
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<h2 id="apropos" align="center">À propos du Site</h2>

<p align="center"><img src="./images_readme/Screen.png" width="900px"></p>

<p align="center">Groupomania est un groupe spécialisé dans la grande distribution. Il a pour projet de construire un réseau social interne pour les employés afin de facilité les interactions entre eux et ainsi améliorer l'ambiance au sein de l'Entreprise.
</p>

<h3 id="outils">&#x1F6E0 Outils utilisés</h3>

<p>Pour réaliser ce site, différents outils ont été utilisés afin qu'il soit fonctionnel côté Frontend comme côté Backend.</p>

* [VueJS](https://fr.vuejs.org/) (version 3.0.11)

* [Node.JS](https://nodejs.org/en/blog/release/v14.15.1/) (version 14.15.1)

* [MySQL](https://www.mysql.com/fr/) (Base de donnée)

* [Sequelize](https://sequelize.org/) (version 6.5.0)

<h3 id="doc">&#x1F4D4 Documentation</h3>

<p>Lors de la réalisation du site, plusieurs régles ont dût être respectées.</p>

* [Cahier des charges](./images_readme/Groupomania_Specs_FR_DWJ_VF.pdf)

<h2 id="demarrage" align="center">Démarrage</h2>

<h3 id="prerequis">&#x1F6A7 Prérequis</h3>

<p>Afin de pouvoir utiliser l'application, nous devons cloner le projet disponible sur GitHub vers le dossier de votre choix.</p>

   ```sh
   git clone https://github.com/KevinAudibert/Groupomania.git
   ```

&#x1F6A8; **Attention** &#x1F6A8;
---

Il sera necessaire de créer un fichier `.env` dans le dossier **backend** et un fichier `config.json` dans le dossier **config** afin d'avoir accès à votre Base de données **MySQL**.

Dans le fichier `.env`, il faudra coller une struture de code comme celle ci-dessou :

   ```js
  DB_NAME=DatabaseName
  DB_USER=UserName
  DB_PASS=Password

  SECRET_KEY_TOKEN=SecretKeyToken
   ```

Pour le fichier `config.json`, il faudra coller une structure de code comme celle ci-dessou : 

```json
{
  "development": {
    "username": "UserName",
    "password": "Password",
    "database": "DatabaseName",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

&#x26A0; Pour des raisons de sécurité, il faudra renseigner vos propres données à la place des variables _SecretKeyToken_, _DatabaseName_, _UserName_ et _Password_ pour avoir accès à votre Base de données. :key:


<h3 id="installation">&#x2699 Installation</h3>

<p>Le projet contient plusieurs parties qui doivent être configurées pour le bon fonctionnement de l'application.</p>

<h4>Frontend :</h4>

1. Ouverture d'un Terminal depuis votre IDE
    `Ctrl+Maj+ù`

2. Ciblage du dossier Frontend du projet
    ```console
    cd frontend
    ```
3. Installation des Packages NPM 
   ```console
   npm install
   ```

4. Démarrage du Server de développement
   ```console
   npm run serve
   ```

<h4>Backend :</h4>

1. Ouverture d'un nouveau Terminal depuis votre IDE
    `Ctrl+Maj+ù`

2. Ciblage du dossier Backend du projet
    ```console
    cd backend
    ```
3. Installation des Packages NPM 
   ```console
   npm install
   ```

4. Création Tables dans la BDD
   ```console
   sequelize db:migrate
   ```

5. Démarrage du Server
   ```console
   nodemon server
   ```

<h3 id="lancement">&#x1F6A6 Lancement Application</h3>

Pour avoir accès au frontend de l'application, rendez-vous sur : 

[http://localhost:8080](http://localhost:8080)

<h2 id="dependence" align="center">&#x1F4E6 Dépendences NPM &#x1F4E6</h2></br>

| Dependances NPM          | Description                                      | Documentation |
|--------------------------|--------------------------------------------------|---------------|
| bcrypt                   | Cryptage des mots de passe                       |[bcrypt](https://www.npmjs.com/package/bcrypt)|
| body-parser              | Parse des données JSON                           |[body-parser](https://www.npmjs.com/package/body-parser)       |
| dotenv                   | Sécurisation des données accès BDD               |[dotenv](https://www.npmjs.com/package/dotenv)       |
| validator                | Valide adresse mail                              |[validator](https://www.npmjs.com/package/validator) |
| express                  | Framework pour application                       |[express](https://www.npmjs.com/package/express)       |
| express-rate-limit       | Sécurisation de l'application express            |[express-rate-limit](https://www.npmjs.com/package/express-rate-limit)       |
| helmet                   | Sécurisation de l'application express            |[helmet](https://www.npmjs.com/package/helmet)       |
| jsonwebtoken             | Création de TOKEN                                |[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)       |
| sequelize                | Outils ORM                    |[sequelize](https://www.npmjs.com/package/sequelize)       |
| mysql2                   | Pilote NodeJs pour MySQL                    |[mysql2](https://www.npmjs.com/package/mysql2)       |
| multer                   | Téléchargement de fichiers                       |[multer](https://www.npmjs.com/package/multer)       |
| axios                    | Client HTTP basé sur la promesse pour le navigateur et node.js |[axios](https://www.npmjs.com/package/axios)       |
| vue-router               | Ecosystème Vue                      |[vue-router](https://www.npmjs.com/package/vue-router)       |
| vuex                     | Gestionnaire d'Etat + Bibliothèque Vue           |[vuex](https://www.npmjs.com/package/vuex)       |


<h2 id="contact" align="center">&#x1F4C7 Contact</h2>

Adresse Email : [Kevin.audibert26@gmail.com](mailto:kevin.audibert26@gmail.com)

Lien du Projet: [https://github.com/KevinAudibert/Groupomania](https://github.com/KevinAudibert/Groupomania)
