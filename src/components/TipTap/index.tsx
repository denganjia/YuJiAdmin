import "./index.less";
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import { Button, Card, ConfigProvider, Divider, Select } from "antd";
import {
	UndoOutlined,
	RedoOutlined,
	OrderedListOutlined,
	UnorderedListOutlined,
	BoldOutlined,
	ItalicOutlined,
	StrikethroughOutlined
} from "@ant-design/icons";
import { Code, CodeBrackets, Quote } from "@icon-park/react";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
	if (!editor) {
		return null;
	}

	const paragraphSelect = (value: 1 | 2 | 3 | 4 | 5 | 6 | 0) => {
		if (value) {
			editor.chain().focus().toggleHeading({ level: value }).run();
		} else {
			editor.chain().focus().setParagraph().run();
		}
	};

	return (
		<ConfigProvider componentSize={"middle"}>
			<Button
				type={"text"}
				onClick={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				className={editor.isActive("bold") ? "is-active" : ""}
				icon={<BoldOutlined />}
			></Button>
			<Button
				type={"text"}
				onClick={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				className={editor.isActive("italic") ? "is-active" : ""}
				icon={<ItalicOutlined />}
			></Button>
			<Button
				type={"text"}
				onClick={() => editor.chain().focus().toggleStrike().run()}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
				className={editor.isActive("strike") ? "is-active" : ""}
				icon={<StrikethroughOutlined />}
			></Button>
			<Button
				type={"text"}
				onClick={() => editor.chain().focus().toggleCode().run()}
				disabled={!editor.can().chain().focus().toggleCode().run()}
				className={editor.isActive("code") ? "is-active" : ""}
				icon={<Code />}
			></Button>
			<Divider type="vertical"></Divider>
			<Select
				style={{ width: "100px" }}
				defaultValue={0}
				options={[
					{ value: 1, label: "H1" },
					{ value: 2, label: "H2" },
					{ value: 3, label: "H3" },
					{ value: 4, label: "H4" },
					{ value: 5, label: "H5" },
					{ value: 6, label: "H6" },
					{ value: 0, label: "正文" }
				]}
				onChange={paragraphSelect}
			></Select>
			<Divider type="vertical"></Divider>
			<Button
				type={"text"}
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={editor.isActive("bulletList") ? "is-active" : ""}
				icon={<UnorderedListOutlined></UnorderedListOutlined>}
			></Button>
			<Button
				type={"text"}
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				className={editor.isActive("orderedList") ? "is-active" : ""}
				icon={<OrderedListOutlined></OrderedListOutlined>}
			></Button>
			<Divider type="vertical"></Divider>
			<Button
				type={"text"}
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				className={editor.isActive("codeBlock") ? "is-active" : ""}
				icon={<CodeBrackets />}
			></Button>
			<Button
				type={"text"}
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				className={editor.isActive("blockquote") ? "is-active" : ""}
				icon={<Quote />}
			></Button>
			<Divider type="vertical"></Divider>
			<Button
				type={"text"}
				onClick={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}
				icon={<UndoOutlined></UndoOutlined>}
			></Button>
			<Button
				type={"text"}
				onClick={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}
				icon={<RedoOutlined />}
			></Button>
		</ConfigProvider>
	);
};

const Index = () => {
	const editor = useEditor({
		extensions: [StarterKit],
		content: `
      <h2>
        Hi there,
      </h2>
      <p>
        this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
      </p>
      <ul>
        <li>
          That’s a bullet list with one …
        </li>
        <li>
          … or two list items.
        </li>
      </ul>
      <p>
        Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
      </p>
      <pre><code class="language-css">body {
  display: none;
}</code></pre>
      <p>
        I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
      </p>
      <blockquote>
        Wow, that’s amazing. Good work, boy! 👏
        <br />
        — Mom
      </blockquote>
    `
	});

	return (
		<Card bordered={false} title={<MenuBar editor={editor} />}>
			<EditorContent editor={editor} />
		</Card>
	);
};
export default Index;
