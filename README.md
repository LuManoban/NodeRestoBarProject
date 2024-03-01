## Conexión a BD PostgreSQL (.env)
DB_DATABASE='node_restobarproject'
DB_USERNAME='postgres'
DB_PASSWORD='Lisasamm18.'
DB_HOST='localhost'
DB_PORT=5432
DB_DRIVER='postgres'

## Crud Completo (Usuarios, Roles) (.env)

Usuario : 
Listar Usuarios
Crear
Modificar
Eliminar

Roles : 
Listar Usuarios
Crear
Modificar
Elimina

## Controladores  (.env)

-auth
-roles
-usarios

## Rutas Protegidas JWT (.env)

Productos , Delivery , Contactanos, Administrador por RoleId

## Modelos Relacionados (.env)

Usuarios relacionados con Roles
static associate(models) {
    this.belongsTo(models.roles, {
      foreignKey: "role_id",
      targetKey: "id",
    });
  }

## Despliegue (.env)

Render: Backend y Base de Datos

## Backend (.env)

NodeJS(Express)

## Documentacion (.env)

Postman

## Repositorio Documentado con README.md (.env)

Github
