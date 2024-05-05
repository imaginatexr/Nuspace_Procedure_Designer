Software need to install on local machine
Node js- https://nodejs.org/en/download
Then install angular cli
npm install -g @angular/cli  
https://angular.io/guide/setup-local


Need to download code or clone in local device
First we need to execute command

**npm install**

Then need to execute command **ng serve -o** for accessing page

**Optinal**

if we are getting error which are related to css loader then execute below command 

**npm install css-loader --save**

**npm install style-loader --save**

**npm install --save diagram-js-minimap**

if we need to install bpmn-js file then execute below commad

**npm install --save bpmn-js**

**Ui flow**

There are two option in ui landing page 
1.Create New Flow chart diagram from bpmn-js library
2.Open existing BPMN diagram from bpmn-js library

You can download the bmpn file with extension bpmn and we can open existing diagram as well.

<img width="621" alt="image" src="https://github.com/imaginatexr/conditionalprocedurediagram/assets/149040365/ca598587-8143-4f38-a35f-7138585b5a29">

**Deployment**

if we need to deploy code on iis server then execute below command

**ng build --configuration production**

Above command will create dist folder in root director of project , please use dist folder content to deploy on server.

In iis , right click on sites and choose add websites then select physical path your dist folder and click ok

![image](https://github.com/imaginatexr/conditionalprocedurediagram/assets/149040365/8e2e6a23-25f2-45fe-b539-15fe76b8505b)



