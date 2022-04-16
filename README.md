# node-websocket-chat-autenticacion


### Quitar algo de git que se haya subido y se coloco en el gitignore
``` 
git rm .env --cached 
```


### agregar a otro repositorios al mismo tiempo
``` 
git remote add heroku https://git.heroku.com/jdvpl-rest-server-node.git 
```

### ver todas las variables

```
 heroku config
```
### crear variables de entorno en heroku

``` 
heroku config:set name_variable="*******" 
```


### ver logs de heroku en vivo en la consola 
``` 
heroku logs -n 100 --tail 
```

### documentacion

``` 
https://documenter.getpostman.com/view/16893611/UVkjvdNT 
```

### Temas

```
  Autenticar Sockets

  Usar JWT para validar Sockets

  Headers personalizados para Sockets

  Implementar el login en el FrontEnd

  Implementar y usar el GoogleSign in creado

  Enviar mensajes privados

  Enviar mensajes a salas

  Enviar mensajes globales
```