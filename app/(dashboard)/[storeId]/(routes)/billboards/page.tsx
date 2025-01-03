import { BillboardClient } from "./components/client";

export default function BillboardsPage() {
    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-4">
                <BillboardClient />
            </div>
        </div>
    );
}
