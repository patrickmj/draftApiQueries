/* 
 * Initial passes as possible API query and response structures
 * for various Northeastern Library DH projects
 * 
 * 
 * 
 */
// Work data
// /work/{id}

var workResponse = {
    "id" : 'id',
    "uri" : 'work uri',
    "collectionId" : 'collectionId',
    /* I'm not 100% happy with the name of genre, but that's what
     * we've been using so far.
     * It replaces and expands the mimeType signal
     * @TODO This is a question of both naming and conceptualization
     * to figure out
     * Options include using DCMI Types, an internal enum list (maybe w/ namespaces?), other?
     *  */
    "genre" : '',

    // it's conceivable that metada could come from many different sources for one render
    "metadata" : {
        /* dublinCoreBasics is there to give the minimal info for
         * a browse display
         * @TODO have DSG and Digital Exhibits folks figure out
         * what should be here
         * Specialized cases like ETD might need special exceptions, requiring
         * digging into mods or other */
        "dublinCoreBasics" : {},
        "lastUpdated" : 'date',
        /* 
         * How to handle crazy things like LATEX??
         * insert JS to deal with markdown?
         */
        
        /* Open question of whether mods just contains everything as extensions
         * which sounds better for faceting
         * Separating schemas out has other utility, though */
        
        "mods" : {}, // mods object mostly as it now exists
        // ... below are hypothetical other metadata formats
        // the key would point to how to process/render in payload
        // an alternative approach would be to normalize everything into MODS, or some other patois
        "vraCore"     : {},
        "dpla"        : {},
        "europeana"   : {},
        "wikidata"    : {},
        "geoNamesRdf" : {}
        // etc for whatever else that might be stuffed into a metadata standard
    },
    
    // assets come from our conversations about handling rendering of XML docs
    // these will vary by system, so the big picture is the higher level structure
    // of assets to park various kinds of data
    // The goal is to provide a modular structure that we can expand in a reasonable way
    
    "assets" : {
        "viewPackage" : {
            "url" : '' // url to get more info about the view package ala TAPAS for display, or maybe this should be directly expanded?
        },
        "cssUrls" : [
            'url to css',
            'url to more css'
            // etc
        ],
        "jsUrls" : [
            'url to js'
        ],
        
        "cdns" : [
            'url to csn' // not sure if this should be distinct from jsUrls above    
        ],
        // it's unlikely that there would be more than one xsl, but possible, and keeping the array
        // structure consistent might be helpful
        "xslUrls" : [
            'uri to xsl',
            'uri to more xsl'
        ]
    },
    
    // representations is where things get interesting, as I'm thinking of it
    // as an abstraction and clarification what currently in `assoc_files` from DRS
    // as with the assets above, there's also a possibility that they could come
    // from more than one data source
    "representations" : {
        
        /* sourceRepresentation reflects the move away from the primary
         * content object being the full thing
         * An open question is whether this just grabs whatever was uploaded,
         * or if there's a completely new endpoing for metadata etc about it
         * @TODO: compare API structures against PCDM model
         *  */  
        "sourceRepresentation" : '',
        
        "textType" : {
            "type" : 'markdown',
            "content" : 'blah'
        }
        
        "thumbnails" : [
            {"url" : '', "mimeType" : ''}
            // .....
            
        ],
        "html" : {
            "type" : 'snippet or complete page or url',
            "data" : '' //depends on value of type
        },
        "svg"  : 'url',
        "pdf"  : 'url',
        "tei"  : 'url' //but this might often be the same as the item itself, so I'm not entirely sure what to do with it
        
    }
    
    
}

// Search results data (mostly facets + pointers to Work/Item data?)
// /search/items/{?facets='', ?title='', ?collectionId='', ...}
var searchResponse = {
        "pagination": {
            "page": '', 
            "totalPages": '', 
            "limit" : '',
            "currentPage" : '',
            "next" : '', //url to next page with GET params. convenient sugar to give me the next page without calculating it. Probably doesn't matter where it's calculated
            "prev" : '' // same as above
        },
        "works" : [
            { "id" : '', //
              "uri" : '', // endpoint to get full item data as above
               // statement of status in a workflow, publication status, etc.
               // might be thought of as a superset of permissions
               
               
              /* @TODO: figure out what status means vis a vis pipelines 
               * and messaging systems
               *  */ 
              "status" : '',
              
              /* As above, a @TODO of figuring out what the 
               * concise metadata to display should be
               * (not sure if stuffing it into DC is 
               * the best option) */
              "dublinCoreMetadata" : {},
              
              /* I don't like "representations" meaning different things
               * here as opposed to the work response above
               *  */
              "representations" : {"small" : '',  // uris to different sized thumbnails.
                                    "medium" : '', // depending on system queried, could be direct images, generated on-the-fly images,
                                    "large" : ''   // or IIIF params
                                   }
            }
            // ...
        ]
    
}


// Collection data from DRS (is this closely analogous to Project level?)
// I imagine this as a blend of search and item, in that there will be metadata 
// about collections, like items, but also an abbreviated list of items, like search
// /collection/{id} GET params?


