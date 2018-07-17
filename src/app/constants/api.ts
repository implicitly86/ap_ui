/*
 * ©  Implicitly86 All Rights Reserved
 */

/**
 * API серверной части приложения.
 */
enum Api {
    GET_EMPLOYEES = '/employees',
    DELETE_EXCLUDED_EMPLOYEES = '/excluded-employees',
    GET_EXCLUDED_EMPLOYEES = '/excluded-employees',
    POST_EXCLUDED_EMPLOYEES = '/excluded-employees',
    GET_JIRA_PROJECTS = '/jira-projects',
    DELETE_MANAGER_EMPLOYEES = '/line-manager-employees',
    GET_MANAGER_EMPLOYEES = '/line-manager-employees',
    POST_MANAGER_EMPLOYEES = '/line-manager-employees',
    PUT_MANAGER_EMPLOYEES = '/line-manager-employees',
    GET_MANAGERS = '/line-managers',
    POST_MANAGERS = '/line-managers',
    POST_LINK_PROJECTS = '/link-projects',
    GET_LINKED_PROJECTS = '/linked-projects',
    DELETE_MSP_EXCLUDED_PROJECT = '/msp-excluded-projects',
    GET_MSP_EXCLUDED_PROJECTS = '/msp-excluded-projects',
    POST_MSP_EXCLUDED_PROJECT = '/msp-excluded-projects',
    GET_MSP_PROJECTS = '/msp-projects',
    POST_UNLINK_PROJECTS = '/unlink-projects',
    POST_LOGIN = '/login'
}

export default Api;