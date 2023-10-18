## HAPPY PATH PARA HACER UNA COMPRA EN RETROGAMES STORE##


Pagina Index
1.	Presionar el botón “Add to Cart” de cualquiera de las tarjetas de videojuegos.
2.	Aparecerá un Alert en el que se solicita crear una cuenta o loguearse para continuar, al presionar “Go” se redireccionará a la pagina de los formularios de Log In o Sign In.

Pagina de Formularios
1.	Completar los formularios con los datos correspondientes
2.	Controles de data en el formulario:
-	No podra realizarse submit del formulario hasta que no estén todos los campos completos
-	No podra realizarse submit del formulario si las contraseñas no son idénticas.
3.	Al enviar el formulario se guarda el nuevo usuario en el Local Storage (Que simula una base de datos) y figura el pop up de usuario guardado con éxito. Al presionar “Go” se redirecciona al index.

Pagina Index
-	Observaciones:
#	Se observa el nombre del usuario en el banner principal
#	El numero de ítems del carrito en 0
#	Al presionar en el carrito se observara un banner lateral en el que figuran los ítems del carrito y su monto total, en primer lugar estarán en 0.
#	Si se presiona el botón de Buy aparecerá un toast indicando que se debe agregar elementos al carrito para poder comprar.
1.	Añadir un item al carrito presionando en el botón de “Add to Cart” de alguna o algunas de las cartas de videojuegos.
Se observara que el indicador de numero de ítems del carrito aumenta en 1
2.	Al presionar el carrito se observara el banner con los ítems, y el monto.
3.	Si se desea eliminar un item, presionar el icono – a la izquierda del item, al presionarlo el item desaparece y también se descuenta el monto del item del monto total del carrito.
4.	Al presionar el botón Buy, se redirecciona a la pagina de compra.

Pagina de compra
-	Observaciones:
#	Se observa el banner principal parcialmente vacio salvo el titulo.
#	Tarjetas de compra: 
+- Izquierda, con los ítems del carrito y el monto total de la compra
+- Derecha, con los descuentos aplicables a la compra.
1.	Seleccionar un Descuento de la tarjeta de la derecha, no son acumulables. Se observara que se aplica el porcentaje de descuento al monto total indicado en la tarjeta izquierda.
2.	Presionar el botón de Buy de la tarjeta izquierda.
3.	Se observaran por 3 segundos los detalles de la compra en el banner principal, luego se redireccionara a la pagina de inicio.
4.	Una vez en la pagina de inicio presionar el icono de perfil que se encuentra en la esquina superior derecha, al lado del carrito de compra.

Pagina de Perfil
-	Observaciones:
#	Se observaran dos tarjetas, la primera con los datos del usuario y la segunda con un listado con el detalle de todas las compras realizadas por el usuario.
1.	Para modificar algún dato del usuario presionar el botón Update User
2.	Se observar aun pequeño formulario con los datos del usuario como placeHolders.
3.	Se puede modificar individualmente cualquiera de los 3 datos ( username, mail, contraseña), con el control de que en el caso de modificarse la contraseña del usuario, deberá repetirse de manera idéntica, caso contrario un toast avisara que las contraseñas no son idénticas.
4.	Al presionar Save, se observara como han cambiado los datos del usuario en la tarjeta de los datos personales.

Pagina Index
-	Finalmente el botón logout, redirecciona al la pagina de formularios, sin borrar todavía el local Storage

Pagina de Formularios
-	Log In:
#	Podra realizarse log in completando los datos del usuario recién creado o alguno de los siguientes usuarios guardados en la BD(Ante duda pueden revisarse dichos perfiles en la carpeta "DB" del proyecto):
1.	Username: John McLane
Password: pass11
2.	Username: James Bond
Password: pass12
3.	Username: Lenny Kravitz
Password: pass13
#	En el caso de que alguno de los campos del formulario este vacío aparecerá un pop up indicando que deben completarse todos los campos.
#	En el caso de que los datos del formulario no correspondan con usuarios registrados aparecerá un pop up indicando que el usuario no se encuentra registrado.
#	En el caso de que el usuario se encuentre registrado aparecerá un pop up de Log In succesful, al aceptar se redirigirá a la pagina de inicio.

//----------------------------------//

## HAPPY PATH PARA JUGAR DEMO DE SNAKE ##
Pagina Index
1. Seleccionar el Boton "Demo" de la carta de videojuego "Snake"
2. En el caso de que no se encuentre registrado el usuario solicitara que se registre mediante un pop-up, al presionar Go, redirigira a la pagina de formularios

Pagina Formularios
1. Crear un usuaio o ingresar uno existente de la manera explicada en el apartado precedente.
2. Al ingresar con un nuevo usuario o uno creado previamente, se redirige a la pagina de origen, en donde se podra volver a seleccionar la pocion "Demo" de la carta de juego "Snake"

Pagina SnakeGame
- Observaciones:
# Se observa en el margen izquierdo una targeta en la que se determinara el nombre y puntaje del jugador cuando el juego comience
# Centro: Canva en donde se desarrolla el juego
# Plano derecho: Un tanteador con jugadores ficticios creados al efecto, a los que al comienzo de cada partida se les setea un puntaje aleatorio.

1. Para iniciar a jugar se debe presionar la pantalla verde del centro.
2. A medida que la serpiente va adquiriendo comida se hace mas larga y se aumenta el puntaje del jugador en 10.
3. Si el jugador iguala o supera a alguno de los jugadores del Score-Board de la derecha, sera incluido en el mismo en la posicion que le corresponda segun su puntaje.