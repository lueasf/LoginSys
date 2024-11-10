# LoginSys

## Description
Ce projet utilise node.js et express pour créer un système d'authentification simple avec des sessions, des messages flash et des mots de passe chiffrées. J'utilise **bcrypt** pour chiffrer les mots de passe et **passport** pour gérer l'authentification.

Ce que fait l'app :
* On peut s'enregistrer sur **/register**
* On peut se connecter sur **/login**
* On peut se déconnecter sur **/logout**

C'est tout. C'est assez simple mais c'est important pour des plus gros projets de savoir gérer l'auth.

init :
```
npm init

npm i express ejs bcrypt passport passport-local express-session express-flash method-override
```
avec express : application web  
avec ejs : moteur de template  
avec bcrypt : chiffrage des mots de passe  
avec passport : gestion de l'authentification  
avec passport-local : stratégie d'authentification locale  
avec express-session : gestion des sessions  
avec express-flash : messages flash pour les mauvais mots de passe etc  
avec method-override : pour réécrire sur les méthodes HTTP

```
npm i --save-dev nodemon dotenv
```
avec nodemon : redémarrage automatique du serveur
avec dotenv : variables d'environnement
