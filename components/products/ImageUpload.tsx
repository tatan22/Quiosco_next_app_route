"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import type { CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from "next/image";
import { getImagePath } from "@/src/utils";

export default function UploadPage({ image }: { image: string | undefined }) {
	const [imageUrl, setImageUrl] = useState("");

	return (
		<CldUploadWidget
			onSuccess={(result, { widget }) => {
				console.log("Imagen subida:", result.event);
				if (result.event === "success") {
					widget.close();
					const info = result.info as CloudinaryUploadWidgetInfo;
					setImageUrl(info.secure_url);
				}
			}}
			uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
			options={{
				// multiple: true,
				maxFiles: 1,
				// maxFileSize: 2000000
			}}
		>
			{({ open }) => (
				<>
					<div className="spacey-2">
						<label className="text-slate-800" htmlFor="name">
							Imagen Producto
						</label>

						<div
							className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100 "
							onClick={() => open?.()}
						>
							<TbPhotoPlus size={50} />
							<p className="text-lg font-semibold">Agregar Imagen</p>
							{imageUrl && (
								<div className="absolute inset-0 w-full h-full">
									<Image
										fill
										style={{ objectFit: "contain" }}
										src={imageUrl}
										alt={imageUrl}
									/>
								</div>
							)}
						</div>
					</div>
					{image && !imageUrl && (
						<div className="space-y-2 flex flex-col items-center">
							<label> Imagen Actual: </label>
							<div className="relative w-64 h-64">
								<Image
									fill
									src={getImagePath(image)}
									alt="Imagen Producto"
									style={{ objectFit: "contain" }}
									// className="w-8 h-8"
								/>
							</div>
						</div>
					)}
					<input
						type="hidden"
						name="image"
						defaultValue={imageUrl ? imageUrl : image}
					/>
				</>
			)}
		</CldUploadWidget>
	);
}
