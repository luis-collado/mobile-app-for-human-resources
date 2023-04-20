class apiService{

async updateProfilePhoto(uid, base64Image) {
    const response = await fetch(
        "https://uploadphotos-zvcc2bcxkq-nw.a.run.app/uploadPhotos",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: uid,
                photo: base64Image,
            }),
        }
    );

    if (!response.ok) {
        throw new Error(
            `Error al actualizar la foto de perfil: ${response.statusText}`
        );
    }

    const data = await response.json();
    console.log("Foto de perfil actualizados", data);
    return data;
}
}