1.Installation :
-	Avec VS code cloner le dépôt : https://github.com/Lazene/Projet-c-t--client-Frontend.git
-	Installer les dépendances : dans le terminal exécutez ‘npm install’
-	Démarrer l’application en exécutant ‘ng serve’ via le répertoire /Projet-c-t--client-Frontend
-	Accéder à l'application : Rendez-vous sur http://localhost:4200/
2.Structure du Frontend
•	src/app : contient tous les composants et les sous composant, pour cette partie également avec l’expérience apporter par ce projet je me dis que la structure aurait pu être plus claire. 
•	src/app/services : contient tous les services partagés par les différents composants. 
•	src/app/shared : contient les DTOs , authguard ainsi que le jwt.interceptor.
•	src/app/app-routing : contient toutes les routes de l'application.
•	src/app/app-module : contient tous les modules de l'application.
•	src/app/assets : contient toutes les images du site ainsi que le style-min.css qui s’applique à tous les composant.
3.Fonctionnalités de l'Application :

Une fois que les deux applications sont lancées vous arrivez sur une page home, qui présente l’école, cette page dispose d’une navbar qui permet d’avoir différent renseigne sur l’école et également un onglet pour se connecter à l’intranet. 

a.Connexion et Rôles:
- Connexion : En fonction de votre rôle, vous serez redirigé vers le tableau de bord approprié avec une barre de navigation correspondante.
- Inscription : Lors de l'inscription, les utilisateurs reçoivent par défaut le rôle d'étudiant. Seul l'administrateur peut directement attribuer ou modifier les rôles.
Petite parenthèse Vous avez également une fonctionnalité pour changer de mots de passe. 

b.Côté étudiant :
Maintenant lorsqu’un étudiant vient de s’inscrire il sera d’abord redirigé pour se logger, ensuite il arrivera sur sa dashbord, dans la navbar il aura la possibilité de s’inscrire au cours de son choix via my course. 
Une fois qu’il s’inscrire il aura automatique les devoirs liés à ce ou ses cours qui seront disponible. 
Il pourra donc aller voir ses devoir sur my assignments et les soumettre, si la deadline est dépassé il ne pourra plus le soumettre. Une fois que le prof aura mis des notes, il aura la possibilité de les voire sur my-note. 
Dans la dashbord, il à un résumé des cours où il est inscrit, des devoirs qu’il a, de sa moyenne générale et la dernière notification que l’admin aurait enregistré.

c.Côté Professeur :
Quand un professeur se connecte il a une dashbord qui lui permet en cliquant sur :
-	my_course de voir les cours qu’il donne et les étudiant inscrit au cours, 
-	create assignement de créer un devoir selon le cours qu’il donne de mettre une note maximale et une deadline, ainsi que de modifier les devoirs déjà en cours. 
-	Grade assignments permet de visualiser tous les devoirs, et de les notés s’ils sont soumis par l’élève
-	Student list, permet d’avoir la liste des étudiants par cours avec le nombre de devoirs qu’il devait soumettre, ceux déjà soumis et leurs moyennes.
Dans la navbar il y a course ou le prof peut voir la liste des cours qui sont donné, les modifié ou les supprimer et voir tout les étudiants inscrit au cours. 
Avec create Course il peut créer un cours en choisissant le prof qui donne le cours.

d.Coté Administrateur :
-	Il a une dashboard reprenant le nombre de connexion qu’il y a eu ainsi que la dernière notification faite 
-	Dans la navbar : l’onglet user permet de soit clique sur create user, qui permet de créer un nouvel utilisateur en choisissant son rôle, ou obtenir la liste des utilisateurs qui permet soit de modifier un utilisateur soit de le supprimer. 
    Par là il peut également changer un mot de passe 
-	Dans l’onglet course comme le professeur il peut créer un cours ou voir la liste des cours en ayant la possibilité de supprimer, modifier un cours ou voir les détails du cours 
-	Dans l’onglet student, l’administrateur à la possibilité de soit créer un student, soit voir la liste des étudiant qui offre la possibilité de modifier les informations, de le supprimer et de l’inscrire à des cours. 
-	Et pour finir on a l’onglet notification qui permet de voir l’historique des notifications et de créer une nouvelle notification qui s’affichera chez les étudiants . 

e.Gestion des mots de passe :
Petite particularité du changement de mot de passe, j’ai émis l’hypothèse vue qu’on ne travaille pas avec de adresses mail, que l’utilisateur qui a perdu ou oublié son mot de passe, doit passer chez l’administrateur qui lui redonnera un 
mot de passe par défaut vu qu’il a la possibilité de changer de mot de passe. A la première connexion de l’utilisateur, il aura une notification pour changer ce mot de passe par défaut et sera redirigé vers le bon formulaire.

