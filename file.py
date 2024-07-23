class File:
    lines: list[str]
    size: int

    def __init__(self, path, size):
        self.lines = self._read_file()

    def _read_file(self, path):
        lines = []
        with open(path, "rb") as f:
            while line := f.read(self.size):
                if line == b"\n":
                    continue
                lines.append(line)
        return lines
