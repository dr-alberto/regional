import { TextLinkLeft } from "../../components/TextLinkLeft";

export const Header = ({ siteId, portalId, portalName, publishedActive, isModified, savePortal, onPublish }) => {
  return (
    <header>
          <div className="flex justify-between mx-auto max-w-7xl px-4 py-1 sm:px-6 lg:px-8">
            <div>
              <h1 className="text-2xl font-semibold">Edit portal</h1>
              <div>
                <span className="font-semibold">Portal: </span>
                <span>{portalName}</span>
                {" "}
                {publishedActive ? (
                  <span className="text-sm font-semibold leading-6 text-teal-600">
                    Active
                  </span>
                ) : (
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    Saved as draft
                  </span>
                )}
              </div>
              
            </div>

            <div className="flex items-center gap-x-3">
              <TextLinkLeft text={"Return"} url={`/sites/${siteId}`} />
              <span className="text-gray-400">|</span>
              <button
                onClick={onPublish}
                className="h-fit rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Publish
              </button>
              <a
                href={`/test/${portalId}`}
                target="_blank"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Preview
              </a>
              <a
                href="#"
                onClick={savePortal}
                disabled={!isModified}
                className="h-fit rounded-md bg-teal-600 text-white px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset hover:opacity-90"
              >
                {isModified && "Save changes"}
                {!isModified && "Saved"}
              </a>
            </div>
          </div>
        </header>
  )
}