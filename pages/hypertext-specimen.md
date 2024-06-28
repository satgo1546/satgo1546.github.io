---
lang: en
---

# Hypertext specimen

```ruby
#!/usr/bin/env ruby
=begin
multiline comment
=end
class Klass < Superklass
  # :markup: rdoc
  # comment
  def initialize(foo = $bar) = @baz = @@baz = [
    nil, true, false, self, 0b0 + 01 - 2 * 0x3 / 4.0,
    :symbol, ?c, "string\n\t#{'string'}", %q(string),
    /regexp/i, __dir__ and __FILE__, `subshell`,
  ].map { |x| x }
  CONSTANT = <<~END
    heredoc
  END
end
```

```xml
<?xml version="1.0"?>
<!DOCTYPE lol [
	<!ELEMENT lol (#PCDATA)>
	<!ATTLIST lol lol CDATA #IMPLIED>
	<!ENTITY lol "lol">
]>
<lol lol="&lol;">&lol;</lol>
```
