Starter project
=================

1. #### Import your model

- Get a local copy of this model
```
git clone https://github.com/maclaude/starter-project.git

# OR (with SSH)

git clone git@github.com:maclaude/starter-project.git
```

2. #### Copy the model inside your new project repository

- At the root directory where your `starter-project` folder is located, clone your project repository.
- Go to your project repository
```
cd your-project-repository
```
- Execute the following commands to copy folders / files / hidden files inside your project folder

```
# Recursive copy of the model folder (excluding .git directory)
rsync -r --exclude '.git' ../starter-project/ .
```

3. #### Install the dependencies

- `yarn`

4. #### Start gulp dev server

- `yarn start`
 
5. __Your are good to go__ :v:
