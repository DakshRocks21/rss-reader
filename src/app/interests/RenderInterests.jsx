import { CiGlobe } from "react-icons/ci";
import { RenderCheckbox } from "./Checkbox";

// Already subscribed interests section (pull from Firebase)
export function RenderSubscribedInterests({ feeds, filter }) {
    return (
        <>
            <h2 className="text-lg font-semibold text-on-surface mb-4">Subscribed Interests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                {feeds.map((feed) => (
                    (filter.length === 0 || feed.categories.some(category => filter.includes(category))) ? (
                        <div className="bg-surface-bright p-6 rounded-lg shadow-md border border-gray-200 flex items-center" key={feed.url}>
                            <div className="flex items-center w-full space-x-4">
                                {feed.name && feed.name !== "" ? (
                                    <>
                                        {feed.image && feed.image !== "" ? (
                                            <img src={feed.image} alt={feed.name} className="w-12 h-12 object-cover rounded-full" />
                                        ) : (
                                            <CiGlobe className="w-12 h-12 text-on-surface" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base md:text-lg font-semibold text-on-surface">{feed.name}</h3>
                                            <p className="text-sm md:text-base text-on-surface">{feed.description}</p>
                                            <p className="text-sm text-on-surface overflow-x-clip">{feed.url}</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <CiGlobe className="w-12 h-12 text-on-surface" />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base md:text-lg font-semibold text-on-surface">
                                                {feed.url.toString().replace("https://", "").split("/")[0].split(".").slice(-2).join(".")}
                                            </h3>
                                            <p className="text-sm text-on-surface overflow-x-clip">{feed.url}</p>
                                        </div>
                                    </>
                                )}

                                <div className="flex-shrink-0">
                                    <RenderCheckbox feed={feed} feeds={feeds} />
                                </div>
                            </div>
                        </div>
                    ) : null
                ))}
            </div>
        </>
    );
}

// Preset interests selection section
export function RenderInterestSelection({ presetFeeds, filter }) {
    return (
        <>
            <h2 className="text-lg font-semibold text-on-surface mb-4">Available Interests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                {presetFeeds.map((feed) => (
                    (filter.length === 0 || feed.categories.some(category => filter.includes(category))) ? (
                        <div className="bg-surface-bright p-6 rounded-lg shadow-md border border-gray-200 flex items-center" key={feed.url}>
                            <div className="flex items-center w-full space-x-4">
                                {feed.image ? (
                                    <img src={feed.image} alt={feed.name} className="w-12 h-12 object-cover rounded-full" />
                                ) : (
                                    <CiGlobe className="w-12 h-12 text-on-surface" />
                                )}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base md:text-lg font-semibold text-on-surface">{feed.name}</h3>
                                    <p className="text-sm md:text-base text-on-surface">{feed.description}</p>
                                    <p className="text-sm text-on-surface overflow-x-clip">{feed.url}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <RenderCheckbox feed={feed} feeds={presetFeeds} />
                                </div>
                            </div>
                        </div>
                    ) : null
                ))}
            </div>
        </>
    );
}
