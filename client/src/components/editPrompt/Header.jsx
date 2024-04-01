import { TextLinkLeft } from "../TextLinkLeft";

export const Header = ({ siteId, name, onPublish, onSave, isModified }) => {
  return (
    <header className="border-b border-zinc-100">
      <div className="flex justify-between mx-auto max-w-7xl px-4 py-1 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-semibold">
            Edit prompt
          </h1>
          <div>
            <span className="font-semibold">Prompt: </span>
            <span>{name}</span>
          </div>
        </div>

        <div className="flex items-center gap-x-3">
          <TextLinkLeft text={"Return"} url={`/sites/${siteId}`} />
          <span className="text-gray-400">|</span>
          <button
            onClick={onPublish}
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Publish
          </button>

          <button
            onClick={onSave}
            disabled={!isModified}
            className="rounded-md bg-teal-600 text-white px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset hover:opacity-90"
          >
            {isModified && "Save changes"}
            {!isModified && "Saved"}
          </button>
        </div>
      </div>
    </header>
  );
};
