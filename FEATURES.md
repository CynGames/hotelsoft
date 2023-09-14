TODO Users

- Hacer findeone por id, can pipe validator (parseUUIDPipe), current user decorator.
- Hacer blockUser, param id, admin role
- Anadir un lastUpdatedBy field que indique quien ha hecho el cambio. Asegurarse de que funciona en findAll sin args, con args y findOne
- Hacer updateUser, con el updateUserInput que pueda cambiar toda la informacion excepto el id

TODO Reservations/Rooms?

- Lo normal
- ResolverField para un "count field" de las reservas de un usuario (@Parent)
- findOne, removeOne, updateOne, createOne todos asociados al usuario actual donde tenga sentido
