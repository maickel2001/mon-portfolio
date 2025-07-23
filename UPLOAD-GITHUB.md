# 🚀 Guide Upload GitHub + Hébergement Gratuit

## **Méthode 1 : Interface Web GitHub (Plus Simple)**

### Étape 1 : Créer le Repository
1. Allez sur https://github.com
2. Cliquez sur **"+"** → **"New repository"**
3. **Nom** : `mon-portfolio` (ou votre choix)
4. ✅ **Public** (obligatoire pour GitHub Pages gratuit)
5. ❌ Ne pas cocher "Add a README file"
6. Cliquez **"Create repository"**

### Étape 2 : Upload les Fichiers
1. Sur la page de votre repository, cliquez **"uploading an existing file"**
2. **Drag & Drop** tous vos fichiers du dossier `portfolio-site/` :
   - `index.html`
   - `styles.css`  
   - `script.js`
   - `demo.html`
   - `README.md`
   - `GUIDE-RAPIDE.md`
   - `dark-theme.css`
3. **Message de commit** : "Premier commit - Site portfolio"
4. Cliquez **"Commit changes"**

### Étape 3 : Activer GitHub Pages
1. Dans votre repository → **Settings** (onglet)
2. Descendez jusqu'à **"Pages"** (menu de gauche)
3. **Source** : "Deploy from a branch"
4. **Branch** : "main" (ou "master")
5. **Folder** : "/ (root)"
6. Cliquez **"Save"**

### ✅ **Résultat : Site en ligne !**
Votre site sera accessible à : `https://VOTRE-USERNAME.github.io/mon-portfolio`

---

## **Méthode 2 : Ligne de Commande (Plus Pro)**

### Prérequis
```bash
# Installer Git (si pas déjà fait)
# Windows : https://git-scm.com/download/win
# Mac : brew install git
# Linux : sudo apt install git

# Configurer Git (première fois seulement)
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@gmail.com"
```

### Étapes Ligne de Commande
```bash
# 1. Aller dans le dossier de votre site
cd portfolio-site

# 2. Initialiser Git (déjà fait dans notre cas)
git init

# 3. Ajouter tous les fichiers
git add .

# 4. Premier commit
git commit -m "Premier commit - Site portfolio développeur web comptable"

# 5. Renommer la branche en main (standard moderne)
git branch -M main

# 6. Connecter à votre repository GitHub
# Remplacez VOTRE-USERNAME et VOTRE-REPO par vos vraies valeurs
git remote add origin https://github.com/VOTRE-USERNAME/VOTRE-REPO.git

# 7. Push vers GitHub
git push -u origin main
```

### Si problème d'authentification
GitHub requiert maintenant un **Personal Access Token** :

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. **Generate new token** → **Generate new token (classic)**
3. **Scopes** : Cochez `repo`
4. **Générer** et **copier le token**
5. Utilisez le token comme mot de passe quand Git vous le demande

---

## **Méthode 3 : GitHub Desktop (Interface Graphique)**

### Installation
1. Téléchargez **GitHub Desktop** : https://desktop.github.com/
2. Connectez-vous avec votre compte GitHub

### Étapes
1. **File** → **New repository**
2. **Name** : `mon-portfolio`
3. **Local path** : Choisissez le dossier parent de `portfolio-site`
4. **Create repository**
5. **Drag & drop** vos fichiers dans le dossier créé
6. **Commit** → Écrivez un message → **Commit to main**
7. **Publish repository** → ✅ **Public** → **Publish**

---

## **Activer GitHub Pages (Hébergement Gratuit)**

### Une fois votre code sur GitHub :

1. **Repository** → **Settings** → **Pages**
2. **Source** : "Deploy from a branch"
3. **Branch** : "main" 
4. **Save**

### ⏱️ **Délai d'activation : 5-10 minutes**

Votre site sera accessible à :
```
https://VOTRE-USERNAME.github.io/NOM-DU-REPOSITORY
```

---

## **🎯 Exemple Complet**

Si votre username GitHub est `johndev` et votre repository `portfolio-comptable` :

### Repository :
```
https://github.com/johndev/portfolio-comptable
```

### Site en ligne :
```
https://johndev.github.io/portfolio-comptable
```

---

## **🔄 Mettre à Jour le Site**

### Méthode Web
1. Allez dans votre repository
2. Cliquez sur le fichier à modifier
3. Cliquez sur l'icône **crayon** (Edit)
4. Modifiez le contenu
5. **Commit changes**

### Méthode Ligne de Commande
```bash
# Modifier vos fichiers localement
# Puis :
git add .
git commit -m "Mise à jour du contenu"
git push
```

**🎊 En 5-10 minutes, vos changements seront visibles sur le site !**

---

## **💡 Conseils Pro**

### 🎨 **Domaine Personnalisé (Optionnel)**
1. Achetez un domaine (ex: OVH, Gandi)
2. **Settings** → **Pages** → **Custom domain**
3. Ajoutez votre domaine
4. Configurez les DNS chez votre registrar

### 🚀 **Optimisations**
- Compressez vos images avant upload
- Testez votre site sur mobile avant publication
- Vérifiez tous les liens

### 🛠️ **Troubleshooting**
- **Site pas visible** : Vérifiez Settings → Pages
- **Erreur 404** : Vérifiez que `index.html` est à la racine
- **Changements pas visibles** : Attendez 5-10 min ou videz le cache navigateur

---

## **🎉 Félicitations !**

Votre site portfolio professionnel est maintenant :
- ✅ **Sauvegardé** sur GitHub
- ✅ **Accessible** publiquement 
- ✅ **Hébergé gratuitement**
- ✅ **Facilement modifiable**

**Partagez votre lien avec vos futurs clients ! 🚀**