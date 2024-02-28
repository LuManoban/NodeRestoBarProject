# NodeJS

- Entorno de ejecucion

```js
// Sincrono (con await) - Codigo bloqueante
async function funcionUno() {}
async function funcionDos(valor) {}
async function funcionTres(valor) {}

const valorUno = await funcionUno();
const valorDos = await funcionDos(valorUno);
const resultado = await funcionTres(valorDos);
console.log(resultado);

// Asincrono (con callbacks) - Codigo no bloqueante
const funcionUno = (callback) => {
  callback("funcionUno");
};

const funcionDos = (valor, callback) => {
  // ---
  callback(valor);
  // ---
};

const functionTres = (valor, callback) => {
  // ---
  callback(valor);
  // ---
};

funcionUno((resultadoUno) => {
  funcionDos(
    (resultadoUno,
    (resultadoDos) => {
      funcionTres(
        (resultadoDos,
        (resultadoFinal) => {
          console.log(resultadoFinal);
        })
      );
    })
  );
});
```

## Variables de entorno (.env)

```py
DB_DATABASE=''
DB_USERNAME='postgres'
DB_PASSWORD=''
DB_HOST=''
DB_PORT=5432
DB_DRIVER='postgres'

TZ='America/Lima'
PORT=3000
NODE_ENV=development

SECRET_KEY=''
JWT_ACCESS_EXPIRE='30m'
JWT_REFRESH_EXPIRE='6h'

MAIL_USERNAME='@gmail.com'
MAIL_PASSWORD=''

S3_ACCESS_KEY_ID=''
S3_ACCESS_KEY_SECRET=''
S3_REGION='us-east-2'
S3_BUCKET=''
```

## Entidades (Modelos)

- Usuarios

| campo     | tipo         | opciones     |
| --------- | ------------ | ------------ |
| name      | VARCHAR(120) |              |
| last_name | VARCHAR(160) |              |
| username  | VARCHAR(80)  | UNIQUE       |
| email     | VARCHAR(180) | UNIQUE       |
| password  | VARCHAR(150) |              |
| avatar    | VARCHAR(255) | NULL TRUE    |
| status    | BOOLEAN      | DEFAULT TRUE |

- Roles

| campo  | tipo        | opciones     |
| ------ | ----------- | ------------ |
| name   | VARCHAR(80) |              |
| status | BOOLEAN     | DEFAULT TRUE |

## Relacion entre Modelos (SEQUELIZE)

1. hasOne (Uno a Uno)

```js
UserModel.hasOne(ProfileModel); // ProfileModel user_id (fk)
```

2. belongsTo (Uno a Uno - Inverso)

```js
ProfileModel.belongsTo(UserModel); // ProfileModel user_id (fk)
```

3. hasMany (Uno a Muchos)

```js
UserModel.hasMany(PostModel); // PostModel user_id (fk)
// PostModel.belongsTo(UserModel); // PostModel user_id (fk)
```

4. belongsToMany (Muchos a Muchos)

- Una tabla pivote (requerido).

```js
UserModel.belongsToMany(ProjectModel, { through: "users_projects" });
ProjectModel.belongsToMany(UserModel, { through: "users_projects" });
```

**Opciones en los metodos de relación (asociación)**

```js
{
  foreignKey: '',
  targetKey: ''
}
```

## Migraciones

- Crear migraciones

```sh
npx makemigration --name nombre_migracion
```

- Sincronizar migraciones

```sh
npx runmigration
```
