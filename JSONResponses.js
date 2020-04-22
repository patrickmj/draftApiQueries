/* 
 * First passes as possible API query and response structures
 * for various Northeastern Library DH projects
 * 
 * 
 * 
 */
// Work / Item data
// /item/{id}

var itemResponse = {
    "id" : 'id',
    "uri" : 'item uri',
    "collectionId" : 'collectionId',
    // mimeType needs a philosophical choice vis a vis representations. If the item is the
    // file uploaded, then it makes sense here. If the item is treated more like a
    // frbr:Work as an abstraction, then mime types should only be reported
    // for actual files
    "mimeType" : '',
    // it's conceivable that metada could come from many different sources for one render
    "metadata" : {
        "mods" : {}, // mods object mostly as it now exists
        // ... below are hypothetical other metadata formats
        // the key would point to how to process/render in payload
        // an alternative approach would be to normalize everything into MODS, or some other patois
        "vraCore"     : {},
        "dpla"        : {},
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
        "items" : [
            { "id" : '', //
              "uri" : '', // endpoint to get full item data as above
              // mimeType needs a philosophical choice vis a vis representations. If the item is the
              // file uploaded, then it makes sense here. If the item is treated more like a
              // frbr:Work as an abstraction, then mime types should only be reported
              // for actual files
              "mimeType" : '',  
              "title" : '',
              // not sure what can be normalized to expose at this level,
              // of if there's a need to dive deeper into MODS data here
              // (which would make the payload quite large)
              "creators" : [
                  // array of creator names
                  // needs a way to distinguish primary author when needed
                  // also special cases to consider, ala ETD data
              ],
              "contributors" : [
                  
              ],
               // statement of status in a workflow, publication status, etc.
               // might be thought of as a superset of permissions
               
              "status" : '',
              "dateCreated" : '',
              "description" : '',
              "subjects"    : [
                  
              ],
              "thumbnails" : {"small" : '',  // uris to different sized thumbnails.
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


