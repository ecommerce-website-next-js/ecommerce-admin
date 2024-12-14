import { isAuthenticated } from "@/utils/is-authenticated";
import { NextResponse } from "next/server";
import formidable from "formidable";
import { Readable } from "stream";
import { IncomingMessage } from "http";

export const config = {
    api: {
        bodyParser: false, // Деактивиране на вградения bodyParser
    },
};

// Функция за преобразуване на Web API Request в Node.js IncomingMessage
function toIncomingMessage(req: Request): IncomingMessage {
    const { headers, body, method, url } = req;
    const incomingMessage = new Readable() as any; // Cast to IncomingMessage
    incomingMessage.headers = Object.fromEntries(headers.entries());
    incomingMessage.method = method;
    incomingMessage.url = url || "";
    incomingMessage._body = body;

    incomingMessage._body = body;
    incomingMessage._read = function () {
        const reader = body?.getReader();
        reader?.read().then(({ value, done }) => {
            if (done) {
                incomingMessage.push(null);
            } else {
                incomingMessage.push(Buffer.from(value));
            }
        });
    };

    return incomingMessage;
}

export async function POST(request: Request) {
    try {
        const user = await isAuthenticated();

        if (!user) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const form = formidable({
            uploadDir: "./public/uploads/billboards",
            keepExtensions: true,
        });
        const req = toIncomingMessage(request); // Преобразуване на заявката

        const parseForm = () =>
            new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
                (resolve, reject) => {
                    form.parse(req, (err, fields, files) => {
                        if (err) reject(err);
                        else resolve({ fields, files });
                    });
                }
            );

        const { files } = await parseForm();
        const uploadedFile = files.image;

        if (!uploadedFile) {
            return new NextResponse("No file uploaded", { status: 400 });
        }

        return NextResponse.json({
            message: "File uploaded successfully",
            file: uploadedFile[0].newFilename,
            path: `/${uploadedFile[0].newFilename}`,
        });
    } catch (error) {
        console.error("[UPLOAD_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}