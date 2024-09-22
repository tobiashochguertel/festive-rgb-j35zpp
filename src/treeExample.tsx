/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import cloneDeep from "lodash/cloneDeep";
import * as React from "react";

import { Classes, Icon, Intent, Tree, TreeNodeInfo } from "@blueprintjs/core";
import {
  ContextMenu2,
  Classes as Popover2Classes,
  Tooltip2,
} from "@blueprintjs/popover2";

type NodePath = number[];

type TreeAction =
  | {
      type: "SET_IS_EXPANDED";
      payload: { path: NodePath; isExpanded: boolean };
    }
  | { type: "DESELECT_ALL" }
  | {
      type: "SET_IS_SELECTED";
      payload: { path: NodePath; isSelected: boolean };
    };

function forEachNode(
  nodes: TreeNodeInfo[] | undefined,
  callback: (node: TreeNodeInfo) => void
) {
  if (nodes === undefined) {
    return;
  }

  for (const node of nodes) {
    callback(node);
    forEachNode(node.childNodes, callback);
  }
}

function forNodeAtPath(
  nodes: TreeNodeInfo[],
  path: NodePath,
  callback: (node: TreeNodeInfo) => void
) {
  callback(Tree.nodeFromPath(path, nodes));
}

function treeExampleReducer(state: TreeNodeInfo[], action: TreeAction) {
  switch (action.type) {
    case "DESELECT_ALL":
      const newState1 = cloneDeep(state);
      forEachNode(newState1, (node) => (node.isSelected = false));
      return newState1;
    case "SET_IS_EXPANDED":
      const newState2 = cloneDeep(state);
      forNodeAtPath(
        newState2,
        action.payload.path,
        (node) => (node.isExpanded = action.payload.isExpanded)
      );
      return newState2;
    case "SET_IS_SELECTED":
      const newState3 = cloneDeep(state);
      forNodeAtPath(
        newState3,
        action.payload.path,
        (node) => (node.isSelected = action.payload.isSelected)
      );
      return newState3;
    default:
      return state;
  }
}

export const TreeExample: React.FC<{}> = (props) => {
  const [nodes, dispatch] = React.useReducer(treeExampleReducer, INITIAL_STATE);

  const handleNodeClick = React.useCallback(
    (
      node: TreeNodeInfo,
      nodePath: NodePath,
      e: React.MouseEvent<HTMLElement>
    ) => {
      const originallySelected = node.isSelected;
      if (!e.shiftKey) {
        dispatch({ type: "DESELECT_ALL" });
      }
      dispatch({
        payload: {
          path: nodePath,
          isSelected: originallySelected == null ? true : !originallySelected,
        },
        type: "SET_IS_SELECTED",
      });
    },
    []
  );

  const handleNodeCollapse = React.useCallback(
    (_node: TreeNodeInfo, nodePath: NodePath) => {
      dispatch({
        payload: { path: nodePath, isExpanded: false },
        type: "SET_IS_EXPANDED",
      });
    },
    []
  );

  const handleNodeExpand = React.useCallback(
    (_node: TreeNodeInfo, nodePath: NodePath) => {
      dispatch({
        payload: { path: nodePath, isExpanded: true },
        type: "SET_IS_EXPANDED",
      });
    },
    []
  );

  return (
    <Tree
      contents={nodes}
      onNodeClick={handleNodeClick}
      onNodeCollapse={handleNodeCollapse}
      onNodeExpand={handleNodeExpand}
      className={Classes.ELEVATION_0}
    />
  );
};

const contentSizing = {
  popoverProps: { popoverClassName: Popover2Classes.POPOVER2_CONTENT_SIZING },
};

function generateNode(pid: number, contextMenu: boolean): TreeNodeInfo[] {
  const nodes: TreeNodeInfo[] = [];
  for (let i = 0; i < 1000; i++) {
    nodes.push({
      id: pid * 10000 + i,
      label: contextMenu ? (
        <ContextMenu2 content={<div>"hi"</div>}>{i}</ContextMenu2>
      ) : (
        <div>{i}</div>
      ),
    });
  }
  return nodes;
}

/* tslint:disable:object-literal-sort-keys so childNodes can come last */
const INITIAL_STATE: TreeNodeInfo[] = [
  {
    id: 0,
    hasCaret: true,
    icon: "folder-close",
    label: (
      <ContextMenu2 {...contentSizing} content={<div>Hello there!</div>}>
        ChildNodes have context menu - Slow Expanding
      </ContextMenu2>
    ),
    childNodes: generateNode(0, true),
  },
  {
    id: 1,
    icon: "folder-close",
    label: (
      <ContextMenu2 {...contentSizing} content={<div>Hello there!</div>}>
        <Tooltip2 content="I'm a folder <3" placement="right">
          ChildNodes has no context menu - Smooth Expanding
        </Tooltip2>
      </ContextMenu2>
    ),
    childNodes: generateNode(1, false),
  },
];
/* tslint:enable:object-literal-sort-keys */
