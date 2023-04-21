function getFamilyOfElement(element: Element) {
    return {
        parent: element.parentNode,
        previousSibling: element.previousElementSibling,
        nextSibling: element.nextElementSibling
    }
}

function insertAfter(newEl: Element, targetEl: Element) {
    targetEl.parentNode.insertBefore(newEl, targetEl.nextSibling)
}
function insertBefore(newEl: Element, targetEl: Element) {
    targetEl.parentNode.insertBefore(newEl, targetEl)
}


function getElementPropertyValue(el: Element, propertyName: "string") {
    return window.getComputedStyle(el).getPropertyValue(propertyName)
}

function getRootComputedStylePropertyValue(propertyName: string) {
    return window.getComputedStyle(window.document.body).getPropertyValue(propertyName)
}


function getDomPath(el: Element) {
    var stack = [];
    while (el.parentNode != null) {
        if (el.hasAttribute('id') && el.id != '') {
            stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
        } else if (el.hasAttribute('class') && el.className != '') {
            stack.unshift(el.nodeName.toLowerCase() + '.' + el.className);
        } else {
            stack.unshift(el.nodeName.toLowerCase());
        }
        // Typescript :(
        el = el.parentNode as unknown as Element;
    }
    return stack.slice(1).join(" > "); // removes the html element
}

export {
    getFamilyOfElement,
    insertAfter,
    insertBefore,
    getElementPropertyValue,
    getRootComputedStylePropertyValue,
    getDomPath
}