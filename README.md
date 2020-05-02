# Code Readability

## Dependencies

```bash
# Command for git
sudo apt install git -y

# Installing Node 12.x
sudo apt update
sudo apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

# Installing npm
sudo apt install npm -y

# Command for npm packages
npm install dotenv --save
npm install fs --save
npm install express --save
npm install q --save
npm install request --save
npm install body-parser --save
npm install path --save
npm install http --save
npm install cors --save
npm install multer --save
npm install terminate --save
npm install pm2 -g --save
npm install express-fileupload

# Open source tools
# Checkstyle is already included in git repository

# For OCLint 0.13.1
wget -c https://github.com/oclint/oclint/releases/download/v0.13.1/oclint-0.13.1-x86_64-linux-4.4.0-112-generic.tar.gz
tar -xvf oclint-0.13.1-x86_64-linux-4.4.0-112-generic.tar.gz
rm oclint-0.13.1-x86_64-linux-4.4.0-112-generic.tar.gz

# Copying to appropiate locations and adding to $PATH
sudo cp oclint-0.13.1/bin/oclint* /usr/local/bin/
sudo cp -rp oclint-0.13.1/lib* /usr/local/lib/
sudo cp -rp oclint-0.13.1/lib/clang/5.0.1/include/* /usr/local/include/
sudo chmod +x /usr/local/bin/oclint

# For Pylint
pip install pylint
pip install pylint --upgrade

# Pulling code repo
git clone https://github.com/Vipul25/CodeReadability.git

# For verification
sudo apt install postman -y
```

## File Uploads

Create a directory 'uploads' inside project directory
Create a directory 'unzipFile' inside project directory
Create a directory 'DirToBeAnalyzed' inside project directory
Create a directory 'LintOutputRepository' inside project directory

## ESLint Installation

```bash
npm install --save-dev eslint
./node_modules/.bin/eslint --init
```

### After this You will be asked some question by eslint

```bash
1. How would you like to use ESLint?
>> To check syntax, find problems, and enforce code style.
2. What type of modules does your project use?
>> Common JS(require/exports)
3. Which framework does your project use?
>> None of these.
4. Does your project use TypeScript?
>> No
5. Where does your code run?
>> Node
6. How would you like to define a style for your project?
>> Answer question about your style.
7. What format do you want your config file to be in?
>> JSON
8. What type of indentation do you use?
>> Spaces/Tab.
9. What quotes do you use for Strings?
>> Single/Double.
10. What line ending do you use?
>> unix/windows.
11. Do you require semicolon?
>> yes.
```

### After this you have to add a new property in scripts object under package.json

```bash
"scripts": {
    "lint": "eslint "
}
```

Save it.

## HTMLHint Installation

```bash
npm install htmlhint --save-dev
```

This doesn't create `.htmlhintrc` file by itself. So, create the file in your project directory.

## StyleLint Installation

```bash
npm install --save-dev stylelint stylelint-config-standard
```

This doesn't create `.stylelintrc.json` file by itself. So, create the file in your project directory.

## Run Serve

```bash
node server.js
```

### For avoiding server crashes use pm2 instead of node while starting server

```bash
pm2 server.js
```
