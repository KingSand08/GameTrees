export async function uploadImageToServer(file: File): Promise<{ success: boolean; message: string }> {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload-image-db", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                message: errorData.message || response.statusText,
            };
        }

        return { success: true, message: "Image uploaded successfully." };
    } catch (error) {
        console.error("Error uploading image:", error);
        return { success: false, message: "An error occurred while uploading the image." };
    }
}
