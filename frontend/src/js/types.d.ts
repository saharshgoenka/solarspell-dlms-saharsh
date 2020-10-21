import LibraryAssets from "./library_assets"
import { Sorting } from "@devexpress/dx-react-grid"
import { UseMultipleSelectionState } from "downshift"

interface TabDict {
    [key: string]: TabData
}

interface TabData {
    display_label: JSX.Element | string,
    component: (tabs: TabDict, apis: APIs) => JSX.Element,
    icon: any
}

interface APIs {
    contents_api: ContentsAPI
    lib_versions_api: LibraryVersionsAPI
    lib_assets_api: LibraryAssetsAPI
    users_api: UsersAPI
    metadata_api: MetadataAPI
    lib_modules_api: LibraryModulesAPI
    metadata_api: MetadataAPI,
    utils_api: UtilsAPI
}

interface SerializedMetadata {
    id: number
    name: string
    type: number
    type_name: string
}

type content_filters = {
    title?: string
    years?: [number|null, number|null]
    file_sizes?: [number|null, number|null]
    reviewed_on?: [Date|null, Date|null]
    filename?: string
    copyright?: string
    active?: boolean
    metadata?: number[]
    sort?: string
    duplicatable?: boolean
}

interface SerializedContent {
    id: number
    file_name: string
    filesize: number
    content_file: string
    title: string
    description: string|null
    modified_on: string
    reviewed_on: string
    copyright: string|null
    rights_statement: string|null
    active: boolean
    duplicatable: boolean
    metadata: number[]
    metadata_info: SerializedMetadata[]
    published_year: string|null
}

interface SerializedMetadataType {
    id: number
    name: string
}

type MetadataAPI = {
    state: MetadataProviderState
    refresh_metadata: () => Promise<any>
    add_metadata_type: (type_name: string) => Promise<any>
    edit_metadata_type: (old_type: SerializedMetadataType, new_name: string) => Promise<any>
    delete_metadata_type: (meta_type: SerializedMetadataType) => Promise<any>
    add_metadata: (meta_name: string, meta_type: SerializedMetadataType) => Promise<any>
    edit_metadata: (old_meta: SerializedMetadata, new_name: string) => Promise<any>
    delete_metadata: (meta_type: SerializedMetadata) => Promise<any>
}

type LibraryAssetsAPI = {
    state: LibraryAssetsState
    refresh_assets: () => Promise<any>
    add_library_asset: (image: File, group: AssetGroup) => Promise<any>
    edit_library_asset: (old_asset: LibraryAsset, new_image: File, new_group: AssetGroup) => Promise<any>
    delete_library_asset: (old_asset: LibraryAsset) => Promise<any>
}

type ContentsAPI = {
    state: ContentsProviderState
    load_content_rows: (current_page: number, page_size: number, sorting: Sorting[]) => Promise<void>
    add_content: (fields: content_fields) => Promise<any>
    edit_content: (fields: content_fields, to_edit: SerializedContent) => Promise<any>
    delete_content: (to_delete: SerializedContent) => Promise<any>
    update_search_state: (update_func: (draft: search_state) => void) => Promise<any>
    add_selected_to_folder: (folder: LibraryFolder) => Promise<any>
    set_selection: (selection: any[]) => Promise<any>
    reset_search: () => Promise<any>
}

type LibraryVersionsAPI = {
    state: LibraryVersionsState
    refresh_library_versions: () => Promise<any>
    enter_version_root: (version: LibraryVersion) => Promise<any>
    enter_folder: (folder: LibraryFolder, back?: number) => Promise<any>
    enter_parent: () => Promise<any>
    add_version: (name: string, library_version: string, user: number) => Promise<any>
    set_version_image: (asset: LibraryAsset) => Promise<any>
    update_version: (version: LibraryVersion, name?: string, number?: string, user?: User) => Promise<any>
    delete_version: (version: LibraryVersion) => Promise<any>
    create_child_folder: (parent: LibraryFolder | LibraryVersion, name: string) => Promise<any>
    delete_folder: (folder: LibraryFolder) => Promise<any>
    rename_folder: (folder: LibraryFolder, new_name: string) => Promise<any>
    set_folder_banner: (folder: LibraryFolder, banner: LibraryAsset) => Promise<any>
    set_folder_logo: (folder: LibraryFolder, logo: LibraryAsset) => Promise<any>
    clone_version: (version: LibraryVersion) => Promise<any>
    refresh_current_directory: () => Promise<any>
    remove_content_from_folder: (folder: LibraryFolder, to_remove: SerializedContent[]) => Promise<any>
    add_content_to_folder: (folder: LibraryFolder, to_add: SerializedContent[]) => Promise<any>
    refresh_folders_in_current_version: () => Promise<any>
    add_module_to_version: (version: LibraryVersion, module: LibraryModule) => Promise<any>
    remove_module_from_version: (version: LibraryVersion, module: LibraryModule) => Promise<any>
    refresh_modules_in_current_version: () => Promise<any>
}

type UsersAPI = {
    state: UserProviderState
    refresh_users: () => Promise<any>
    add_user: (name: string) => Promise<any>
}

type UtilsAPI = {
    state: UtilsState
    get_disk_info: () => Promise<any>
}

type UtilsState = {
    disk_used: number
    disk_available: number
}

type LibraryModulesAPI = {
    state: LibraryModulesState
    refresh_library_modules: () => Promise<any>
}

type AssetGroup = 1 | 2 | 3

type LibraryAsset = {
    id: number
    image_file: string|null
    image_group: AssetGroup
    file_name: string|null
}

type group_to_name = {
    [G in AssetGroup]: string
}

interface LibraryVersionsState {
    library_versions: LibraryVersion[]
    current_directory: {
        folders: LibraryFolder[]
        files: SerializedContent[]
    }
    current_version: LibraryVersion
    folders_in_version: [folder: LibraryFolder, path: string][]
    modules_in_version: LibraryModule[]
    path: LibraryFolder[]
}

interface LibraryAssetsState {
    assets: LibraryAsset[]
    assets_by_group: {
        [G in AssetGroup]?: LibraryAsset[]
    }
    group_name: group_to_name
}

type MetadataProviderState = {
    metadata: SerializedMetadata[]
    metadata_by_type: metadata_dict
    metadata_types: SerializedMetadataType[]
}

type ContentsProviderState = {
    last_request_timestamp: number
    display_rows: any[]
    loaded_content: SerializedContent[]
    total_count: number
    search: search_state
    selection: number[]
    filter_out: number[]
}

type UserProviderState = {
    users: User[]
}

type LibraryModulesState = {
    library_modules: LibraryModule[]
}

type metadata_dict = {
    [metadata_type: string]: SerializedMetadata[]
}

// Takes a type and wraps all members of that type with the field_info type constructor
type WrappedFieldInfo<T> = {
    [P in keyof T]: field_info<T[P]>
}

//field_info contains data of a field and information about whether that data is valid.
//reason should default to the empty string "" and any other value will contain a human-readable string
//saying why the data in value is invalid
type field_info<T> = {
    value: T
    reason: string
}

type content_fields = {
    content_file:       File|null
    title:              string
    description:        string
    year:               string
    reviewed_on:        Date|null
    metadata:           metadata_dict
    copyright:          string
    rights_statement:   string
    duplicatable:       boolean
}

type active_search_option = "active" | "inactive" | "all"
type search_state = {
    title: string
    copyright: string
    years_from: number | null
    years_to: number | null
    active: active_search_option
    filename: string
    metadata: metadata_dict
    file_size_from: number | null
    file_size_to: number | null
    reviewed_from: Date | null
    reviewed_to: Date | null
    duplicatable: "all" | "yes" | "no"
}

type LibraryVersion = {
    id: number
    library_name: string
    version_number: string
    library_banner: number
    created_by: number
}

type LibraryFolder = {
    id: number
    folder_name: string
    banner_img: number
    logo_img: number
    version: number
    parent: number | null
    library_content: number[]
}

type User = {
    id: number
    name: string
}

type LibraryModule = {
    id: number
    module_name: string
    module_file: string
    logo_img: number
}