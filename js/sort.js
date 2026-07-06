const Sort = {

    sort(notes, type) {

        const sorted = [...notes];

        const getPinnedValue = (n)=> n.pinned ? 1 : 0

        switch(type) {

            case "updated":
                sorted.sort((a, b) => {
                    const pinDiff = getPinnedValue(b) - getPinnedValue(a)
                    if (pinDiff !== 0) return pinDiff

                    const aTime = new Date(a.updatedAt).getTime()
                    const bTime = new Date(b.updatedAt).getTime()

                    return bTime - aTime
                })

                break;

            case "created":
                sorted.sort((a, b)=> {
                    const pinDiff = getPinnedValue(b) - getPinnedValue(a)
                    if (pinDiff !== 0) return pinDiff

                    const aTime = new Date(a.createdAt).getTime()
                    const bTime = new Date(b.createdAt).getTime()
                
                    return bTime - aTime
                })

                break;

            case "title":
                sorted.sort((a, b)=> {
                    const pinDiff = getPinnedValue(b) - getPinnedValue(a)
                    if (pinDiff !== 0 ) return pinDiff
                    
                    return a.title.localeCompare(b.title)
                })
            
                break;
        }

        return sorted
    }

}