<P align="center"><img src="https://user.oc-static.com/upload/2019/09/04/15676009353158_image2.png"  width="250px"/>
</p>

<h1 align="center">Groupomania - Projet 7</h1>
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

<p align="center"><img src="./images_readme/screen.jpg" width="900px"></p>

<p align="center">So Pekocko est une entreprise familiale de 10 salariés. Son activité principale est la création
de sauces piquantes dont la composition est tenue secrète. Forte de son succès, l’entreprise
souhaite se développer et créer une application web, dans laquelle les utilisateurs pourront
ajouter leurs sauces préférées et liker ou disliker les sauces proposées par les autres.
</p>

<h3 id="outils">&#x1F6E0 Outils utilisés</h3>

<p>Pour réaliser ce site, différents outils ont été utilisés afin qu'il soit fonctionnel côté Frontend comme côté Backend.</p>

* [VueJS](https://fr.vuejs.org/) (version 3.0.11)

* [Node.JS](https://nodejs.org/en/blog/release/v14.15.1/) (version 14.15.1)

* [MySQL](https://www.mysql.com/fr/) (Base de donnée)

<h3 id="doc">&#x1F4D4 Documentation</h3>

<p>Lors de la réalisation du site, plusieurs régles ont dût être respectées. Ci-dessous les différents documents.</p>

* [Cahier des charges](./images_readme/Groupomania_Specs_FR_DWJ_VF.pdf)

* [Note de cadrage](./images_readme/P6_Note_cadrage.pdf)

<h2 id="demarrage" align="center">Démarrage</h2>

<h3 id="prerequis">&#x1F6A7 Prérequis</h3>

<p>Afin de pouvoir utiliser l'application, nous devons cloner le projet disponible sur GitHub vers le dossier de votre choix.</p>

   ```sh
   git clone https://github.com/KevinAudibert/So_Pekocko.git
   ```

&#x1F6A8; **Attention** &#x1F6A8;
---

Il sera necessaire de créer un fichier `.env` dans le dossier **backend** afin d'avoir accès à la Base de données **MongoDB**.

Dans le fichier `.env`, il faudra coller une struture de code comme celle ci-dessou :

   ```js
  TOKEN_KEY=SecretKeyToken

  DB_CLUSTER=ClusterName
  DB_USER=UserName
  DB_PASS=Password
   ```

&#x26A0; Pour des raisons de sécurité, il faudra demander les variables _SecretKeyToken_, _ClusterName_, _UserName_ et _Password_ pour avoir accès à la Base de données. [Cliquer ici](mailto:kevin.audibert26@gmail.com) :key:

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
   ng serve
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

4. Démarrage du Server
   ```console
   nodemon server
   ```

<h3 id="lancement">&#x1F6A6 Lancement Application</h3>

Pour avoir accès au frontend de l'application, rendez-vous sur : 

[http://localhost:4200/signup](http://localhost:4200/signup)

<h2 id="dependence" align="center">&#x1F4E6 Dépendences NPM &#x1F4E6</h2></br>

| Dependances NPM          | Description                                      | Documentation |
|--------------------------|--------------------------------------------------|---------------|
| bcrypt                   | Cryptage des mots de passe                       |[bcrypt](https://www.npmjs.com/package/bcrypt)|
| body-parser              | Parse des données JSON                           |[body-parser](https://www.npmjs.com/package/body-parser)       |
| dotenv                   | Sécurisation des données accès BDD               |[dotenv](https://www.npmjs.com/package/dotenv)       |
| email-validator          | Valide adresse mail                              |[email-validator](https://www.npmjs.com/package/email-validator) |
| express                  | Framework pour application                       |[express](https://www.npmjs.com/package/express)       |
| helmet                   | Sécurisation de l'application express            |[helmet](https://www.npmjs.com/package/helmet)       |
| jsonwebtoken             | Création de TOKEN                                |[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)       |
| mongoose                 | Modélisation d'objets MongoDB                    |[mongoose](https://www.npmjs.com/package/mongoose)       |
| mongoose-unique-validator| Validation de champs unique d'un Schéma Mongoose |[mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator)       |
| multer                   | Téléchargement de fichiers                       |[multer](https://www.npmjs.com/package/multer)       |
| password-validator       | Valide Mot de passe selon spécifications         |[password-validator](https://www.npmjs.com/package/password-validator)       |


<h2 id="contact" align="center">&#x1F4C7 Contact</h2>

Adresse Email : [Kevin.audibert26@gmail.com](mailto:kevin.audibert26@gmail.com)

Lien du Projet: [https://github.com/KevinAudibert/So_Pekocko](https://github.com/KevinAudibert/So_Pekocko)
