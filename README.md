## Build a system to efficiently process image data from CSV files.

### Run
```
npm i
npm start

```

### Add a csv file in teh Postman and add header 

```
Content-Type:multipart/form-data
```
### body
```
form-data --> file type file and add the csv file 
```

### Testing 

## Upload - POST
```
{{host}}/api/upload
```
### body
```
form-data --> file type file and add the csv file 
```

### Status - GET

```
{{host}}/api/status/req_id
```