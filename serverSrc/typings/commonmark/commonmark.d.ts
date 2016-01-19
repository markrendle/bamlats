declare module commonmark {

    class Node {

    }

    class Parser {
        parse(source: string): Node;
    }

    class HtmlRenderer {
        render(node: Node): string;
    }

}
